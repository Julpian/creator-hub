// File: backend/config/setup.go
package config

import (
	"log"

	"github.com/julpian/creator-hub/models" // <-- GANTI DENGAN NAMA MODUL ANDA
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var jwtSecret = []byte("kunci_rahasia_anda_yang_sangat_panjang_dan_unik")

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=postgres dbname=creator_hub_db port=5432 sslmode=disable TimeZone=Asia/Jakarta"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal terhubung ke database!", err)
	}

	database.AutoMigrate(&models.Influencer{}, &models.Admin{}, &models.Category{}, &models.Package{})
	models.DB = database
}

func GetJWTSecret() []byte {
	return jwtSecret
}
