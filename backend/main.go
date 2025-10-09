package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt" // <-- IMPORT INI
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type Influencer struct {
	gorm.Model
	Name     string `json:"name"`
	Category string `json:"category"`
}

// Struct baru untuk tabel Admins
type Admin struct {
	gorm.Model
	Email        string `gorm:"unique"`
	PasswordHash string
}

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=postgres dbname=creator_hub_db port=5432 sslmode=disable TimeZone=Asia/Jakarta"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal terhubung ke database!", err)
	}

	// Migrasi untuk kedua tabel
	database.AutoMigrate(&Influencer{}, &Admin{})

	DB = database
}

func main() {
	ConnectDatabase()
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	router.Use(cors.New(config))

	// Endpoint untuk Influencer
	router.GET("/api/influencers", func(c *gin.Context) {
		var influencers []Influencer
		DB.Find(&influencers)
		c.JSON(http.StatusOK, influencers)
	})

	// Endpoint untuk mengambil SATU influencer berdasarkan ID
	router.GET("/api/influencers/:id", func(c *gin.Context) {
		var influencer Influencer
		id := c.Param("id")

		if err := DB.First(&influencer, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Influencer tidak ditemukan"})
			return
		}

		c.JSON(http.StatusOK, influencer)
	})

	// --- Endpoint untuk Admin ---

	// GANTI TOTAL ENDPOINT LOGIN LAMA DENGAN INI
	router.POST("/api/admin/login", func(c *gin.Context) {
		type LoginPayload struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		var payload LoginPayload
		var admin Admin

		if err := c.ShouldBindJSON(&payload); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Payload tidak valid"})
			return
		}

		// 1. Cari admin berdasarkan email
		if err := DB.Where("email = ?", payload.Email).First(&admin).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
			return
		}

		// 2. Bandingkan password yang dikirim dengan hash di database
		if err := bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(payload.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
			return
		}

		// 3. Jika cocok, login berhasil
		c.JSON(http.StatusOK, gin.H{"message": "Login berhasil!"})
	})

	router.POST("/api/admin/influencers", func(c *gin.Context) {
		var influencer Influencer
		c.BindJSON(&influencer)
		DB.Create(&influencer)
		c.JSON(http.StatusCreated, influencer)
	})

	router.PUT("/api/admin/influencers/:id", func(c *gin.Context) {
		var influencer Influencer
		if err := DB.Where("id = ?", c.Param("id")).First(&influencer).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
			return
		}
		c.BindJSON(&influencer)
		DB.Save(&influencer)
		c.JSON(http.StatusOK, influencer)
	})

	router.DELETE("/api/admin/influencers/:id", func(c *gin.Context) {
		var influencer Influencer
		if err := DB.Where("id = ?", c.Param("id")).First(&influencer).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
			return
		}
		DB.Delete(&influencer)
		c.JSON(http.StatusOK, gin.H{"message": "Data berhasil dihapus"})
	})

	router.Run(":8080")
}
