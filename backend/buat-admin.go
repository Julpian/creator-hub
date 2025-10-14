// File: backend/buat-admin.go
package main

import (
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Ganti "password_rahasia_admin" dengan password yang Anda inginkan
	passwordToHash := []byte("password_rahasia_admin")

	// Menghasilkan hash dari password
	hashedPassword, err := bcrypt.GenerateFromPassword(passwordToHash, bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("Gagal membuat hash password:", err)
	}

	// Menampilkan hasilnya di terminal
	fmt.Println("Password Anda (plain):", string(passwordToHash))
	fmt.Println("Password Hash (simpan ini di database):", string(hashedPassword))
}
