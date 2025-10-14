// File: backend/config/setup.go
package config

import (
	"log"

	"github.com/julpian/creator-hub/models" // <-- GANTI DENGAN NAMA MODUL ANDA
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() {
	dsn := Env("DB_DSN")
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal terhubung ke database!", err)
	}

	database.AutoMigrate(&models.Influencer{}, &models.Admin{}, &models.Category{}, &models.Package{})
	models.DB = database
}

func GetJWTSecret() []byte {
	return []byte(Env("JWT_SECRET"))
}
