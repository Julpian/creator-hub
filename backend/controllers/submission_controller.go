// File: backend/controllers/submission_controller.go
package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/julpian/creator-hub/models" // <-- SESUAIKAN DENGAN NAMA MODUL ANDA
)

// ==================================================
// RUTE PUBLIK: Menerima Formulir
// ==================================================
func SubmitForReview(c *gin.Context) {
	type SubmissionPayload struct {
		Name         string `json:"name" binding:"required"`
		Email        string `json:"email" binding:"required,email"`
		PhoneNumber  string `json:"phoneNumber"`
		Bio          string `json:"bio"`
		Location     string `json:"location"`
		Gender       string `json:"gender"`
		DateOfBirth  string `json:"dateOfBirth"`
		InstagramURL string `json:"instagramUrl" binding:"omitempty,url"`
		TiktokURL    string `json:"tiktokUrl" binding:"omitempty,url"`
		YoutubeURL   string `json:"youtubeUrl" binding:"omitempty,url"`
		FacebookURL  string `json:"facebookUrl" binding:"omitempty,url"`
	}

	var payload SubmissionPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak valid"})
		return
	}

	dob, _ := time.Parse("2006-01-02", payload.DateOfBirth)

	submission := models.InfluencerSubmission{
		Name:         payload.Name,
		Email:        payload.Email,
		PhoneNumber:  payload.PhoneNumber,
		Bio:          payload.Bio,
		Location:     payload.Location,
		Gender:       payload.Gender,
		DateOfBirth:  dob,
		InstagramURL: payload.InstagramURL,
		TiktokURL:    payload.TiktokURL,
		YoutubeURL:   payload.YoutubeURL,
		FacebookURL:  payload.FacebookURL,
		Status:       "pending",
	}

	if err := models.DB.Create(&submission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan pendaftaran"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":      "Pendaftaran Anda telah diterima dan akan ditinjau oleh Admin.",
		"submissionId": submission.ID, // Kirim ID untuk upload gambar
	})
}

// ==================================================
// RUTE ADMIN: Melihat Semua Pendaftar
// ==================================================
func GetSubmissions(c *gin.Context) {
	var submissions []models.InfluencerSubmission
	// Ambil semua yang masih 'pending'
	models.DB.Where("status = ?", "pending").Order("created_at asc").Find(&submissions)
	c.JSON(http.StatusOK, submissions)
}

// ==================================================
// RUTE ADMIN: Menyetujui Pendaftar
// ==================================================
func ApproveSubmission(c *gin.Context) {
	id := c.Param("id")
	var submission models.InfluencerSubmission

	// 1. Cari pendaftar di 'ruang tunggu'
	if err := models.DB.First(&submission, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pendaftaran tidak ditemukan"})
		return
	}

	// 2. Buat Influencer baru di tabel 'influencers' utama
	newInfluencer := models.Influencer{
		Name:               submission.Name,
		Bio:                submission.Bio,
		Location:           submission.Location,
		Gender:             submission.Gender,
		DateOfBirth:        submission.DateOfBirth,
		PhoneNumber:        submission.PhoneNumber,
		InstagramURL:       submission.InstagramURL,
		TiktokURL:          submission.TiktokURL,
		YoutubeURL:         submission.YoutubeURL,
		FacebookURL:        submission.FacebookURL,
		InstagramFollowers: submission.InstagramFollowers,
		TiktokFollowers:    submission.TiktokFollowers,
		YoutubeSubscribers: submission.YoutubeSubscribers,
		ImageURL:           submission.ProfileImageURL, // Ambil gambar profil
		IsRecommended:      false,                      // Admin bisa atur ini nanti
	}

	if err := models.DB.Create(&newInfluencer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat profil influencer"})
		return
	}

	// 3. Update status pendaftar menjadi 'approved'
	models.DB.Model(&submission).Update("status", "approved")

	c.JSON(http.StatusOK, gin.H{
		"message":    "Influencer telah disetujui dan dipindahkan ke daftar publik.",
		"influencer": newInfluencer,
	})
}

func UploadSubmissionImage(c *gin.Context) {
	id := c.Param("id")
	imageType := c.Param("type") // "profile" atau "stats"

	var submission models.InfluencerSubmission
	if err := models.DB.First(&submission, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pendaftaran tidak ditemukan"})
		return
	}

	// Hanya izinkan upload jika status masih 'pending'
	if submission.Status != "pending" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Pendaftaran ini sudah diproses"})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gambar tidak ditemukan"})
		return
	}

	// Buat nama file unik
	filename := fmt.Sprintf("sub-%s-%d-%s", imageType, time.Now().Unix(), file.Filename)
	dst := filepath.Join("./uploads", filename)

	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan gambar"})
		return
	}

	// Tentukan kolom mana yang akan di-update di database
	imageUrl := "/uploads/" + filename
	if imageType == "profile" {
		models.DB.Model(&submission).Update("profile_image_url", imageUrl)
	} else if imageType == "stats" {
		models.DB.Model(&submission).Update("stats_image_url", imageUrl)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tipe gambar tidak valid"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Gambar berhasil diunggah", "imageUrl": imageUrl})
}

// Menolak/Menghapus Pendaftar

func RejectSubmission(c *gin.Context) {
	id := c.Param("id")
	var submission models.InfluencerSubmission

	// 1. Cari pendaftar
	if err := models.DB.First(&submission, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pendaftaran tidak ditemukan"})
		return
	}

	// 2. Hapus file-file gambar terkait dari server
	if submission.ProfileImageURL != "" {
		os.Remove(filepath.Join(".", submission.ProfileImageURL))
	}
	if submission.StatsImageURL != "" {
		os.Remove(filepath.Join(".", submission.StatsImageURL))
	}

	// 3. Hapus record pendaftaran dari database
	models.DB.Unscoped().Delete(&submission)

	c.JSON(http.StatusOK, gin.H{"message": "Pendaftaran telah ditolak dan dihapus"})
}
