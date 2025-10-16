// File: backend/models/models.go
package models

import (
	"time" // <-- TAMBAHKAN IMPORT INI

	"gorm.io/gorm"
)

var DB *gorm.DB

// DEFINISIKAN STRUCT YANG DIBUTUHKAN TERLEBIH DAHULU
type Category struct {
	gorm.Model
	Name string `json:"name"`
}

type PortfolioImage struct {
	gorm.Model
	InfluencerID uint   `json:"influencerId"`
	ImageURL     string `json:"imageUrl"`
	Description  string `json:"description"`
}

// BARU DEFINISIKAN STRUCT YANG MENGGUNAKANNYA
type Influencer struct {
	gorm.Model
	Name               string           `json:"name"`
	ImageURL           string           `json:"imageUrl"`
	Categories         []Category       `gorm:"many2many:influencer_categories;" json:"categories"`
	Bio                string           `json:"bio"`
	InstagramURL       string           `json:"instagramUrl"`
	TiktokURL          string           `json:"tiktokUrl"`
	YoutubeURL         string           `json:"youtubeUrl"`
	InstagramFollowers int              `json:"instagramFollowers"`
	TiktokFollowers    int              `json:"tiktokFollowers"`
	YoutubeSubscribers int              `json:"youtubeSubscribers"`
	Location           string           `json:"location"`
	IsRecommended      bool             `json:"isRecommended"` // <-- Tambahkan ini
	FacebookURL        string           `json:"facebookUrl"`
	PhoneNumber        string           `json:"phoneNumber"`
	Gender             string           `json:"gender"`
	DateOfBirth        time.Time        `json:"dateOfBirth"`
	Age                int              `json:"age" gorm:"-"`
	PortfolioImages    []PortfolioImage `json:"portfolioImages"` // Sekarang tidak akan error
}

type Admin struct {
	gorm.Model
	Email        string `gorm:"unique"`
	PasswordHash string
}

type Package struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Price       int64  `json:"price"`
	Tier        string `json:"tier"`
	ImageURL    string `json:"imageUrl"`
}
