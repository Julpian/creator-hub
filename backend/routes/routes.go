// File: backend/routes/routes.go
package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/julpian/creator-hub/controllers" // <-- GANTI DENGAN NAMA MODUL ANDA
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	router.Static("/uploads", "./uploads")

	// Rute Publik
	api := router.Group("/api")
	{
		// Influencer
		api.GET("/influencers", controllers.GetInfluencers)
		api.GET("/influencers/search", controllers.SearchInfluencers)
		api.GET("/influencers/:id", controllers.GetInfluencerByID)

		// Kategori & Paket
		api.GET("/categories", controllers.GetCategories)
		api.GET("/packages", controllers.GetPackages)
		api.GET("/packages/:id", controllers.GetPackageByID)

		// Admin
		api.POST("/admin/login", controllers.Login)
	}

	// Rute Admin yang Dilindungi
	adminRoutes := api.Group("/admin")
	adminRoutes.Use(controllers.AuthMiddleware())
	{
		// Influencer Admin
		adminRoutes.POST("/influencers", controllers.CreateInfluencer)
		adminRoutes.PUT("/influencers/:id", controllers.UpdateInfluencer)
		adminRoutes.DELETE("/influencers/:id", controllers.DeleteInfluencer)
		adminRoutes.POST("/influencers/:id/upload", controllers.UploadImage)
		adminRoutes.POST("/influencers/:id/portfolio", controllers.UploadPortfolioImage)
		adminRoutes.DELETE("/portfolio/:imageId", controllers.DeletePortfolioImage)

		// Package Admin
		adminRoutes.POST("/packages", controllers.CreatePackage)
		adminRoutes.PUT("/packages/:id", controllers.UpdatePackage)
		adminRoutes.DELETE("/packages/:id", controllers.DeletePackage)
		adminRoutes.POST("/packages/:id/upload", controllers.UploadPackageImage)

	}

	return router
}
