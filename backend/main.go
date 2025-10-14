// File: backend/main.go
package main

import (
	"os"

	"github.com/julpian/creator-hub/config" // <-- GANTI DENGAN NAMA MODUL ANDA
	"github.com/julpian/creator-hub/routes" // <-- GANTI DENGAN NAMA MODUL ANDA
)

func main() {
	config.ConnectDatabase()

	// Pastikan folder uploads ada
	if _, err := os.Stat("./uploads"); os.IsNotExist(err) {
		os.Mkdir("./uploads", os.ModePerm)
	}

	r := routes.SetupRouter()
	r.Run(":8080")
}
