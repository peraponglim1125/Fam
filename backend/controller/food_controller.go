package controller

import (
	"net/http"
	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
)

func GetFoods(c *gin.Context) {
	var data []entity.Foodandexercise
	config.DB().Find(&data)
	c.JSON(http.StatusOK, data)
}

func CreateFood(c *gin.Context) {
	var obj entity.Foodandexercise
	if err := c.ShouldBindJSON(&obj); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Create(&obj)
	c.JSON(http.StatusOK, obj)
}

func UpdateFood(c *gin.Context) {
	id := c.Param("id")
	var obj entity.Foodandexercise
	if err := config.DB().First(&obj, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Food record not found"})
		return
	}
	c.ShouldBindJSON(&obj)
	config.DB().Save(&obj)
	c.JSON(http.StatusOK, obj)
}

func DeleteFood(c *gin.Context) {
	id := c.Param("id")
	config.DB().Delete(&entity.Foodandexercise{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
