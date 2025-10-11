package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
var jwtSecret = []byte("kunci_rahasia_anda_yang_sangat_panjang_dan_unik")

type Influencer struct {
	gorm.Model
	Name               string     `json:"name"`
	ImageURL           string     `json:"imageUrl"`
	Categories         []Category `gorm:"many2many:influencer_categories;" json:"categories"`
	Bio                string     `json:"bio"`
	InstagramURL       string     `json:"instagramUrl"`
	TiktokURL          string     `json:"tiktokUrl"`
	YoutubeURL         string     `json:"youtubeUrl"`
	InstagramFollowers int        `json:"instagramFollowers"`
	TiktokFollowers    int        `json:"tiktokFollowers"`
	YoutubeSubscribers int        `json:"youtubeSubscribers"`
}

type Admin struct {
	gorm.Model
	Email        string `gorm:"unique"`
	PasswordHash string
}

// --- TAMBAHKAN STRUCT BARU DI BAWAH INI ---
type Category struct {
	gorm.Model
	Name string `json:"name"`
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" || len(authHeader) < 7 || authHeader[:7] != "Bearer " {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Format Authorization salah"})
			return
		}

		tokenString := authHeader[7:]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Token tidak valid"})
			return
		}
		c.Next()
	}
}

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=postgres dbname=creator_hub_db port=5432 sslmode=disable TimeZone=Asia/Jakarta"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal terhubung ke database!", err)
	}
	database.AutoMigrate(&Influencer{}, &Admin{}, &Category{})
	DB = database
}

func main() {
	ConnectDatabase()
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	// Pastikan folder uploads ada
	if _, err := os.Stat("./uploads"); os.IsNotExist(err) {
		os.Mkdir("./uploads", os.ModePerm)
	}

	// Folder uploads dapat diakses publik
	router.Static("/uploads", "./uploads")

	// ROUTE PUBLIK
	router.GET("/api/influencers", func(c *gin.Context) {
		// Ambil query parameter (page, limit, dan category_id)
		pageStr := c.DefaultQuery("page", "1")
		limitStr := c.DefaultQuery("limit", "9")
		categoryIDStr := c.Query("category_id") // Ambil ID kategori dari URL

		// Konversi page dan limit ke integer
		page, err := strconv.Atoi(pageStr)
		if err != nil || page < 1 {
			page = 1
		}
		limit, err := strconv.Atoi(limitStr)
		if err != nil || limit < 1 {
			limit = 9
		}
		offset := (page - 1) * limit

		// Siapkan variabel untuk hasil query
		var influencers []Influencer
		var totalInfluencers int64

		// Buat query dasar
		queryBuilder := DB.Model(&Influencer{})

		// Jika ada parameter category_id, tambahkan filter
		if categoryIDStr != "" {
			queryBuilder = queryBuilder.
				Joins("JOIN influencer_categories ON influencer_categories.influencer_id = influencers.id").
				Where("influencer_categories.category_id = ?", categoryIDStr)
		}

		// Hitung total data (setelah filter diterapkan)
		queryBuilder.Count(&totalInfluencers)

		// Ambil data dengan relasi kategori
		queryBuilder.Preload("Categories").
			Limit(limit).
			Offset(offset).
			Order("created_at desc").
			Find(&influencers)

		// Kirimkan response ke frontend
		c.JSON(http.StatusOK, gin.H{
			"data":       influencers,
			"total_data": totalInfluencers,
			"page":       page,
			"limit":      limit,
		})
	})

	// SEARCH INFLUENCERS
	router.GET("/api/influencers/search", func(c *gin.Context) {
		// Ambil query parameter untuk pencarian dan halaman
		query := c.Query("q") // q = query (kata kunci pencarian)
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

		var influencers []Influencer
		var totalInfluencers int64

		// Buat query dasar
		queryBuilder := DB.Model(&Influencer{})

		// Jika ada kata kunci pencarian, tambahkan kondisi WHERE
		if query != "" {
			// ILIKE adalah LIKE yang case-insensitive (tidak peduli huruf besar/kecil)
			// Tanda '%' berarti cocok dengan teks apa pun
			queryBuilder = queryBuilder.Where("name ILIKE ?", "%"+query+"%")
		}

		// Hitung total data SETELAH difilter
		queryBuilder.Count(&totalInfluencers)

		// Ambil data dengan paginasi DARI hasil yang sudah difilter
		queryBuilder.Preload("Categories").Limit(limit).Offset(offset).Order("created_at desc").Find(&influencers)

		c.JSON(http.StatusOK, gin.H{
			"data":       influencers,
			"total_data": totalInfluencers,
			"page":       page,
			"limit":      limit,
			"query":      query, // Kirim kembali query agar frontend tahu sedang dalam mode pencarian
		})
	})

	router.GET("/api/influencers/:id", func(c *gin.Context) {
		var influencer Influencer
		if err := DB.Preload("Categories").First(&influencer, c.Param("id")).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Influencer tidak ditemukan"})
			return
		}
		c.JSON(http.StatusOK, influencer)
	})

	// Endpoint untuk mengambil semua kategori
	router.GET("/api/categories", func(c *gin.Context) {
		var categories []Category
		DB.Find(&categories)
		c.JSON(http.StatusOK, categories)
	})

	// LOGIN ADMIN
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
		if err := DB.Where("email = ?", payload.Email).First(&admin).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
			return
		}
		if err := bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(payload.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
			return
		}

		expirationTime := time.Now().Add(24 * time.Hour)
		claims := &jwt.RegisteredClaims{
			Subject:   admin.Email,
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString(jwtSecret)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat token"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"token": tokenString})
	})

	// ROUTE ADMIN
	adminRoutes := router.Group("/api/admin")
	adminRoutes.Use(AuthMiddleware())
	{
		adminRoutes.POST("/influencers", func(c *gin.Context) {
			// Struct baru untuk menampung payload dari frontend
			type CreateInfluencerPayload struct {
				Name               string `json:"name" binding:"required"`
				Bio                string `json:"bio"`
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

			// 1. Buat influencer baru hanya dengan nama
			newInfluencer := Influencer{
				Name:               payload.Name,
				Bio:                payload.Bio,
				InstagramURL:       payload.InstagramURL,
				TiktokURL:          payload.TiktokURL,
				YoutubeURL:         payload.YoutubeURL,
				InstagramFollowers: payload.InstagramFollowers,
				TiktokFollowers:    payload.TiktokFollowers,
				YoutubeSubscribers: payload.YoutubeSubscribers,
			}
			if err := DB.Create(&newInfluencer).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan influencer"})
				return
			}

			// Hubungkan relasi kategori (logika ini tidak berubah)
			if len(payload.CategoryIDs) > 0 {
				var categories []Category
				DB.Find(&categories, payload.CategoryIDs)
				DB.Model(&newInfluencer).Association("Categories").Replace(categories)
			}

			DB.Preload("Categories").First(&newInfluencer, newInfluencer.ID)
			c.JSON(http.StatusCreated, newInfluencer)
		})

		adminRoutes.PUT("/influencers/:id", func(c *gin.Context) {
			var influencer Influencer
			if err := DB.First(&influencer, c.Param("id")).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
				return
			}

			// Struct payload sekarang juga berisi semua field baru
			type UpdateInfluencerPayload struct {
				Name               string `json:"name" binding:"required"`
				Bio                string `json:"bio"`
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

			// Update semua field pada model influencer yang sudah ada
			influencer.Name = payload.Name
			influencer.Bio = payload.Bio
			influencer.InstagramURL = payload.InstagramURL
			influencer.TiktokURL = payload.TiktokURL
			influencer.YoutubeURL = payload.YoutubeURL
			influencer.InstagramFollowers = payload.InstagramFollowers
			influencer.TiktokFollowers = payload.TiktokFollowers
			influencer.YoutubeSubscribers = payload.YoutubeSubscribers

			// Simpan perubahan data teks
			DB.Save(&influencer)

			// Ganti relasi kategori (logika ini tidak berubah)
			var categories []Category
			if len(payload.CategoryIDs) > 0 {
				DB.Find(&categories, payload.CategoryIDs)
			}
			DB.Model(&influencer).Association("Categories").Replace(categories)

			DB.Preload("Categories").First(&influencer, influencer.ID)
			c.JSON(http.StatusOK, influencer)
		})

		adminRoutes.DELETE("/influencers/:id", func(c *gin.Context) {
			var influencer Influencer
			if err := DB.Where("id = ?", c.Param("id")).First(&influencer).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
				return
			}
			DB.Unscoped().Delete(&influencer)
			c.JSON(http.StatusOK, gin.H{"message": "Data berhasil dihapus!"})
		})

		// Upload gambar
		adminRoutes.POST("/influencers/:id/upload", func(c *gin.Context) {
			id := c.Param("id")
			var influencer Influencer

			if err := DB.First(&influencer, id).Error; err != nil {
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
			DB.Save(&influencer)

			c.JSON(http.StatusOK, gin.H{"message": "Gambar berhasil diunggah!", "data": influencer})
		})
	}

	router.Run(":8080")
}
