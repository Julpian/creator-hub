// File: backend/models/models.go
package models

import "gorm.io/gorm"

// Variabel DB akan diakses dari sini
var DB *gorm.DB

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
	Location           string     `json:"location"`
}

type Admin struct {
	gorm.Model
	Email        string `gorm:"unique"`
	PasswordHash string
}

type Category struct {
	gorm.Model
	Name string `json:"name"`
}

type Package struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Price       int64  `json:"price"`
	Tier        string `json:"tier"`
	ImageURL    string `json:"imageUrl"`
}
