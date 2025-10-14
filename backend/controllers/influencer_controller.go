// File: backend/controllers/influencer_controller.go
package controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/julpian/creator-hub/models" // <-- SESUAIKAN DENGAN NAMA MODUL ANDA
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

	queryBuilder := models.DB.Model(&models.Influencer{})

	if categoryIDStr != "" {
		queryBuilder = queryBuilder.
			Joins("JOIN influencer_categories ON influencer_categories.influencer_id = influencers.id").
			Where("influencer_categories.category_id = ?", categoryIDStr)
	}

	queryBuilder.Count(&totalInfluencers)
	queryBuilder.Preload("Categories").Limit(limit).Offset(offset).Order("created_at desc").Find(&influencers)

	c.JSON(http.StatusOK, gin.H{
		"data":       influencers,
		"total_data": totalInfluencers,
		"page":       page,
		"limit":      limit,
	})
}

func SearchInfluencers(c *gin.Context) {
	query := c.Query("q")
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "9")

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

	queryBuilder := models.DB.Model(&models.Influencer{})
	if query != "" {
		queryBuilder = queryBuilder.Where("name ILIKE ?", "%"+query+"%")
	}

	queryBuilder.Count(&totalInfluencers)
	queryBuilder.Preload("Categories").Limit(limit).Offset(offset).Order("created_at desc").Find(&influencers)

	c.JSON(http.StatusOK, gin.H{
		"data":       influencers,
		"total_data": totalInfluencers,
		"page":       page,
		"limit":      limit,
		"query":      query,
	})
}

func GetInfluencerByID(c *gin.Context) {
	var influencer models.Influencer
	if err := models.DB.Preload("Categories").First(&influencer, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Influencer tidak ditemukan"})
		return
	}
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
		InstagramURL       string `json:"instagramUrl"`
		TiktokURL          string `json:"tiktokUrl"`
		YoutubeURL         string `json:"youtubeUrl"`
		InstagramFollowers int    `json:"instagramFollowers"`
		TiktokFollowers    int    `json:"tiktokFollowers"`
		YoutubeSubscribers int    `json:"youtubeSubscribers"`
		CategoryIDs        []uint `json:"category_ids"`
	}

	var payload CreateInfluencerPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newInfluencer := models.Influencer{
		Name:               payload.Name,
		Bio:                payload.Bio,
		Location:           payload.Location,
		InstagramURL:       payload.InstagramURL,
		TiktokURL:          payload.TiktokURL,
		YoutubeURL:         payload.YoutubeURL,
		InstagramFollowers: payload.InstagramFollowers,
		TiktokFollowers:    payload.TiktokFollowers,
		YoutubeSubscribers: payload.YoutubeSubscribers,
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
		InstagramURL       string `json:"instagramUrl"`
		TiktokURL          string `json:"tiktokUrl"`
		YoutubeURL         string `json:"youtubeUrl"`
		InstagramFollowers int    `json:"instagramFollowers"`
		TiktokFollowers    int    `json:"tiktokFollowers"`
		YoutubeSubscribers int    `json:"youtubeSubscribers"`
		CategoryIDs        []uint `json:"category_ids"`
	}

	var payload UpdateInfluencerPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	influencer.Name = payload.Name
	influencer.Bio = payload.Bio
	influencer.Location = payload.Location
	influencer.InstagramURL = payload.InstagramURL
	influencer.TiktokURL = payload.TiktokURL
	influencer.YoutubeURL = payload.YoutubeURL
	influencer.InstagramFollowers = payload.InstagramFollowers
	influencer.TiktokFollowers = payload.TiktokFollowers
	influencer.YoutubeSubscribers = payload.YoutubeSubscribers

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
	if err := models.DB.Where("id = ?", c.Param("id")).First(&influencer).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
		return
	}
	models.DB.Unscoped().Delete(&influencer)
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
