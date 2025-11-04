package controller

import (
	"net/http"
	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
)

func GetMedicines(c *gin.Context) {
	var data []entity.Medicine
	config.DB().Find(&data)
	c.JSON(http.StatusOK, data)
}

func CreateMedicine(c *gin.Context) {
	var obj entity.Medicine
	if err := c.ShouldBindJSON(&obj); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Create(&obj)
	c.JSON(http.StatusOK, obj)
}

func UpdateMedicine(c *gin.Context) {
	id := c.Param("id")
	var obj entity.Medicine
	if err := config.DB().First(&obj, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Medicine not found"})
		return
	}
	c.ShouldBindJSON(&obj)
	config.DB().Save(&obj)
	c.JSON(http.StatusOK, obj)
}

func DeleteMedicine(c *gin.Context) {
	id := c.Param("id")
	config.DB().Delete(&entity.Medicine{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
