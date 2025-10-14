// File: backend/controllers/package_controller.go
package controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/julpian/creator-hub/models" // <-- SESUAIKAN DENGAN NAMA MODUL ANDA
)

func GetPackages(c *gin.Context) {
	var packages []models.Package
	models.DB.Order("price asc").Find(&packages)
	c.JSON(http.StatusOK, packages)
}

func GetPackageByID(c *gin.Context) {
	var pkg models.Package
	if err := models.DB.First(&pkg, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Paket tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, pkg)
}

func CreatePackage(c *gin.Context) {
	var pkg models.Package
	if err := c.ShouldBindJSON(&pkg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&pkg)
	c.JSON(http.StatusCreated, pkg)
}

func UpdatePackage(c *gin.Context) {
	var pkg models.Package
	if err := models.DB.First(&pkg, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Paket tidak ditemukan"})
		return
	}
	if err := c.ShouldBindJSON(&pkg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Save(&pkg)
	c.JSON(http.StatusOK, pkg)
}

func DeletePackage(c *gin.Context) {
	var pkg models.Package
	if err := models.DB.First(&pkg, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Paket tidak ditemukan"})
		return
	}
	models.DB.Unscoped().Delete(&pkg)
	c.JSON(http.StatusOK, gin.H{"message": "Paket berhasil dihapus"})
}

func UploadPackageImage(c *gin.Context) {
	id := c.Param("id")
	var pkg models.Package

	if err := models.DB.First(&pkg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Paket tidak ditemukan"})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gambar tidak ditemukan"})
		return
	}

	filename := fmt.Sprintf("pkg-%d-%s", time.Now().Unix(), file.Filename)
	dst := filepath.Join("./uploads", filename)

	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan gambar"})
		return
	}

	pkg.ImageURL = "/uploads/" + filename
	models.DB.Save(&pkg)

	c.JSON(http.StatusOK, gin.H{"message": "Gambar paket berhasil diunggah!", "data": pkg})
}
