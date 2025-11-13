// File: backend/controllers/influencer_controller.go
package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10" // <-- SESUAIKAN DENGAN NAMA MODUL ANDA
	"github.com/julpian/creator-hub/models"
)

func GetInfluencers(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "9")
	categoryIDStr := c.Query("category_id")

	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}
	limit, _ := strconv.Atoi(limitStr)
	if limit < 1 {
		limit = 9
	}
	offset := (page - 1) * limit

	var influencers []models.Influencer
	var totalInfluencers int64

	recommended := c.Query("recommended") // "true" atau "false"
	platform := c.Query("platform")       // "instagram", "tiktok", dll.

	queryBuilder := models.DB.Model(&models.Influencer{})

	if categoryIDStr != "" {
		queryBuilder = queryBuilder.
			Joins("JOIN influencer_categories ON influencer_categories.influencer_id = influencers.id").
			Where("influencer_categories.category_id = ?", categoryIDStr)
	}

	// --- TAMBAHKAN LOGIKA FILTER BARU ---
	if recommended == "true" {
		queryBuilder = queryBuilder.Where("is_recommended = ?", true)
	}

	if platform != "" {
		switch platform {
		case "instagram":
			queryBuilder = queryBuilder.Where("instagram_url != '' AND instagram_url IS NOT NULL")
		case "tiktok":
			queryBuilder = queryBuilder.Where("tiktok_url != '' AND tiktok_url IS NOT NULL")
		case "youtube":
			queryBuilder = queryBuilder.Where("youtube_url != '' AND youtube_url IS NOT NULL")
		case "facebook":
			queryBuilder = queryBuilder.Where("facebook_url != '' AND facebook_url IS NOT NULL")
		}
	}

	queryBuilder.Count(&totalInfluencers)
	queryBuilder.Preload("Categories").Limit(limit).Offset(offset).Order("created_at desc").Find(&influencers)

	for i := range influencers {
		influencers[i].Age = calculateAge(influencers[i].DateOfBirth)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":       influencers,
		"total_data": totalInfluencers,
		"page":       page,
		"limit":      limit,
	})
}

func calculateAge(birthDate time.Time) int {
	if birthDate.IsZero() {
		return 0
	}
	today := time.Now()
	age := today.Year() - birthDate.Year()
	if today.YearDay() < birthDate.YearDay() {
		age--
	}
	return age
}

func SearchInfluencers(c *gin.Context) {
	// Ambil semua parameter
	query := c.Query("q")
	location := c.Query("location")
	categoryIDStr := c.Query("category_id")
	gender := c.Query("gender")
	minAgeStr := c.Query("min_age")
	maxAgeStr := c.Query("max_age")

	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "9") // Anda bisa ubah ini ke 10 atau 12

	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}
	limit, _ := strconv.Atoi(limitStr)
	if limit < 1 {
		limit = 9
	} // Sesuaikan default limit
	offset := (page - 1) * limit

	var influencers []models.Influencer
	var totalInfluencers int64

	queryBuilder := models.DB.Model(&models.Influencer{})

	// --- Mulai membangun query ---
	if query != "" {
		queryBuilder = queryBuilder.Where("name ILIKE ?", "%"+query+"%")
	}

	if location != "" {
		queryBuilder = queryBuilder.Where("location ILIKE ?", "%"+location+"%")
	}

	if categoryIDStr != "" {
		queryBuilder = queryBuilder.
			Joins("JOIN influencer_categories ON influencer_categories.influencer_id = influencers.id").
			Where("influencer_categories.category_id = ?", categoryIDStr)
	}

	if gender != "" {
		queryBuilder = queryBuilder.Where("gender = ?", gender)
	}

	today := time.Now()
	if minAgeStr != "" {
		minAge, err := strconv.Atoi(minAgeStr)
		if err == nil && minAge > 0 {
			maxBirthDate := today.AddDate(-minAge, 0, 0)
			queryBuilder = queryBuilder.Where("date_of_birth <= ?", maxBirthDate.Format("2006-01-02"))
		}
	}
	if maxAgeStr != "" {
		maxAge, err := strconv.Atoi(maxAgeStr)
		if err == nil && maxAge > 0 {
			minBirthDate := today.AddDate(-(maxAge + 1), 0, 1)
			queryBuilder = queryBuilder.Where("date_of_birth >= ?", minBirthDate.Format("2006-01-02"))
		}
	}
	// --- Selesai membangun query ---

	// Hitung total data SETELAH semua filter diterapkan
	queryBuilder.Count(&totalInfluencers)

	// Ambil data dengan pagination DARI hasil yang sudah difilter
	// HANYA ADA SATU PANGGILAN .Find()
	queryBuilder.Preload("Categories").Limit(limit).Offset(offset).Order("created_at desc").Find(&influencers)

	// Hitung umur untuk hasil yang ditemukan
	for i := range influencers {
		influencers[i].Age = calculateAge(influencers[i].DateOfBirth)
	}

	c.JSON(http.StatusOK, gin.H{
		"data":        influencers,
		"total_data":  totalInfluencers,
		"page":        page,
		"limit":       limit,
		"query":       query,
		"location":    location,
		"category_id": categoryIDStr,
		"gender":      gender,
		"min_age":     minAgeStr,
		"max_age":     maxAgeStr,
	})
}

func GetInfluencerByID(c *gin.Context) {
	var influencer models.Influencer
	if err := models.DB.Preload("Categories").Preload("PortfolioImages").First(&influencer, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Influencer tidak ditemukan"})
		return
	}

	influencer.Age = calculateAge(influencer.DateOfBirth)

	c.JSON(http.StatusOK, influencer)
}

func GetCategories(c *gin.Context) {
	var categories []models.Category
	models.DB.Find(&categories)
	c.JSON(http.StatusOK, categories)
}

func CreateInfluencer(c *gin.Context) {
	type CreateInfluencerPayload struct {
		Name               string `json:"name" binding:"required"`
		Bio                string `json:"bio"`
		Location           string `json:"location"`
		IsRecommended      bool   `json:"isRecommended"`
		InstagramURL       string `json:"instagramUrl" binding:"omitempty,url"`
		TiktokURL          string `json:"tiktokUrl" binding:"omitempty,url"`
		YoutubeURL         string `json:"youtubeUrl" binding:"omitempty,url"`
		FacebookURL        string `json:"facebookUrl" binding:"omitempty"` // <-- Tambahkan ini
		InstagramFollowers int    `json:"instagramFollowers" binding:"gte=0"`
		TiktokFollowers    int    `json:"tiktokFollowers" binding:"gte=0"`
		YoutubeSubscribers int    `json:"youtubeSubscribers" binding:"gte=0"`
		Gender             string `json:"gender"`
		DateOfBirth        string `json:"dateOfBirth"`
		PhoneNumber        string `json:"phoneNumber"`
		CategoryIDs        []uint `json:"category_ids"`
	}

	var payload CreateInfluencerPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		// Cek apakah error ini adalah error validasi
		if validationErrs, ok := err.(validator.ValidationErrors); ok {
			// Buat pesan error yang lebih mudah dibaca
			errorMessages := make(map[string]string)
			for _, e := range validationErrs {
				// Memberikan pesan error spesifik per field
				errorMessages[e.Field()] = fmt.Sprintf("Field %s gagal validasi, aturan: %s", e.Field(), e.Tag())
			}
			c.JSON(http.StatusBadRequest, gin.H{"errors": errorMessages})
			return
		}
		// Jika errornya bukan karena validasi (misal: JSON tidak valid)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payload JSON tidak valid"})
		return
	}

	dob, _ := time.Parse("2006-01-02", payload.DateOfBirth)

	newInfluencer := models.Influencer{
		Name:               payload.Name,
		Bio:                payload.Bio,
		Location:           payload.Location,
		IsRecommended:      payload.IsRecommended,
		InstagramURL:       payload.InstagramURL,
		TiktokURL:          payload.TiktokURL,
		FacebookURL:        payload.FacebookURL,
		YoutubeURL:         payload.YoutubeURL,
		InstagramFollowers: payload.InstagramFollowers,
		TiktokFollowers:    payload.TiktokFollowers,
		YoutubeSubscribers: payload.YoutubeSubscribers,
		Gender:             payload.Gender,
		DateOfBirth:        dob,
		PhoneNumber:        payload.PhoneNumber,
	}
	if err := models.DB.Create(&newInfluencer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan influencer"})
		return
	}

	if len(payload.CategoryIDs) > 0 {
		var categories []models.Category
		models.DB.Find(&categories, payload.CategoryIDs)
		models.DB.Model(&newInfluencer).Association("Categories").Replace(categories)
	}

	models.DB.Preload("Categories").First(&newInfluencer, newInfluencer.ID)
	c.JSON(http.StatusCreated, newInfluencer)
}

func UpdateInfluencer(c *gin.Context) {
	var influencer models.Influencer
	if err := models.DB.First(&influencer, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
		return
	}

	type UpdateInfluencerPayload struct {
		Name               string `json:"name" binding:"required"`
		Bio                string `json:"bio"`
		Location           string `json:"location"`
		IsRecommended      bool   `json:"isRecommended"`
		InstagramURL       string `json:"instagramUrl" binding:"omitempty"`
		TiktokURL          string `json:"tiktokUrl" binding:"omitempty"`
		YoutubeURL         string `json:"youtubeUrl" binding:"omitempty"`
		InstagramFollowers int    `json:"instagramFollowers" binding:"gte=0"`
		TiktokFollowers    int    `json:"tiktokFollowers" binding:"gte=0"`
		YoutubeSubscribers int    `json:"youtubeSubscribers" binding:"gte=0"`
		Gender             string `json:"gender"`
		DateOfBirth        string `json:"dateOfBirth"`
		PhoneNumber        string `json:"phoneNumber"`
		CategoryIDs        []uint `json:"category_ids"`
	}

	var payload UpdateInfluencerPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dob, _ := time.Parse("2006-01-02", payload.DateOfBirth)

	influencer.Name = payload.Name
	influencer.Bio = payload.Bio
	influencer.Location = payload.Location
	influencer.IsRecommended = payload.IsRecommended
	influencer.InstagramURL = payload.InstagramURL
	influencer.TiktokURL = payload.TiktokURL
	influencer.YoutubeURL = payload.YoutubeURL
	influencer.InstagramFollowers = payload.InstagramFollowers
	influencer.TiktokFollowers = payload.TiktokFollowers
	influencer.YoutubeSubscribers = payload.YoutubeSubscribers
	influencer.Gender = payload.Gender
	influencer.DateOfBirth = dob
	influencer.PhoneNumber = payload.PhoneNumber

	models.DB.Save(&influencer)

	var categories []models.Category
	if len(payload.CategoryIDs) > 0 {
		models.DB.Find(&categories, payload.CategoryIDs)
	}
	models.DB.Model(&influencer).Association("Categories").Replace(categories)

	models.DB.Preload("Categories").First(&influencer, influencer.ID)
	c.JSON(http.StatusOK, influencer)
}

func DeleteInfluencer(c *gin.Context) {
	var influencer models.Influencer
	id := c.Param("id")

	// 1. Cari influencer (sudah benar)
	if err := models.DB.First(&influencer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
		return
	}

	// 2. Mulai Transaksi (agar aman)
	tx := models.DB.Begin()

	// 3. Hapus relasi 'many-to-many' di 'influencer_categories'
	if err := tx.Model(&influencer).Association("Categories").Clear(); err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus relasi kategori"})
		return
	}

	// 4. Hapus 'portfolio_images' (relasi 'has-many')
	var p_images []models.PortfolioImage
	tx.Where("influencer_id = ?", id).Find(&p_images)
	for _, img := range p_images {
		// Hapus file fisik
		os.Remove(filepath.Join(".", img.ImageURL))
		// Hapus record dari DB
		if err := tx.Unscoped().Delete(&img).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus gambar portofolio"})
			return
		}
	}

	// 5. Hapus Influencer utama
	if err := tx.Unscoped().Delete(&influencer).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus influencer"})
		return
	}

	// 6. Commit Transaksi
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal commit transaksi"})
		return
	}

	// 7. Hapus file gambar profil utama (setelah DB sukses)
	if influencer.ImageURL != "" {
		os.Remove(filepath.Join(".", influencer.ImageURL))
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data berhasil dihapus!"})
}

func UploadImage(c *gin.Context) {
	id := c.Param("id")
	var influencer models.Influencer

	if err := models.DB.First(&influencer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Influencer tidak ditemukan"})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gambar tidak ditemukan"})
		return
	}

	filename := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)
	dst := filepath.Join("./uploads", filename)

	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan gambar"})
		return
	}

	influencer.ImageURL = "/uploads/" + filename
	models.DB.Save(&influencer)

	c.JSON(http.StatusOK, gin.H{"message": "Gambar berhasil diunggah!", "data": influencer})
}

func UploadPortfolioImage(c *gin.Context) {
	influencerID := c.Param("id")

	// Cek apakah influencer ada
	var influencer models.Influencer
	if err := models.DB.First(&influencer, influencerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Influencer tidak ditemukan"})
		return
	}

	// Ambil file dari form
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gambar tidak ditemukan"})
		return
	}

	// Ambil deskripsi opsional dari form
	description := c.PostForm("description")

	// Buat nama file unik
	filename := fmt.Sprintf("portfolio-%d-%s", time.Now().Unix(), file.Filename)
	dst := filepath.Join("./uploads", filename)

	// Simpan file
	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan gambar"})
		return
	}

	// Buat record baru di tabel portfolio_images
	portfolioImage := models.PortfolioImage{
		InfluencerID: influencer.ID,
		ImageURL:     "/uploads/" + filename,
		Description:  description,
	}
	models.DB.Create(&portfolioImage)

	c.JSON(http.StatusCreated, portfolioImage)
}

func DeletePortfolioImage(c *gin.Context) {
	imageID := c.Param("imageId")
	var portfolioImage models.PortfolioImage

	// Cari gambar portofolio berdasarkan ID-nya
	if err := models.DB.First(&portfolioImage, imageID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Gambar portofolio tidak ditemukan"})
		return
	}

	// Hapus record dari database
	models.DB.Unscoped().Delete(&portfolioImage)

	// Hapus file fisik dari folder 'uploads'
	// Hapus awalan '/uploads/' untuk mendapatkan nama file
	filePath := filepath.Join(".", portfolioImage.ImageURL)
	os.Remove(filePath)

	c.JSON(http.StatusOK, gin.H{"message": "Gambar portofolio berhasil dihapus"})
}
