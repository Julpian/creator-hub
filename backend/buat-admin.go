// File: backend/buat-admin.go
package main

import (
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Ganti "lutfi123" dengan password yang Anda inginkan
	passwordToHash := []byte("lutfi123")

	hashedPassword, err := bcrypt.GenerateFromPassword(passwordToHash, bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("Gagal membuat hash password:", err)
	}

	fmt.Println("Password Anda (plain):", string(passwordToHash))
	fmt.Println("Password Hash (simpan ini di database):", string(hashedPassword))
}
