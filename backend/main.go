package main

import (
	"fmt"
	"example.com/project_phone/config"
	"example.com/project_phone/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectionDB()
	config.SetupDatabase()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.POST("/login", controller.Login)
		api.POST("/register", controller.Register) // ✅ เพิ่มเส้นทางสมัครสมาชิก
	}

	fmt.Println("✅ Backend running on http://localhost:8080")
	r.Run(":8080")
}
