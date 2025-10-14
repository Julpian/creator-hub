// File: backend/config/env.go
package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Fungsi untuk mengambil variabel dari .env
func Env(key string) string {
	return os.Getenv(key)
}

// Fungsi untuk memuat file .env
func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
