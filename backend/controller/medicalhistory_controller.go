package controller

import (
	"net/http"
	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
)

func GetMedicalHistories(c *gin.Context) {
	var data []entity.Medicalhistory
	config.DB().Find(&data)
	c.JSON(http.StatusOK, data)
}

func CreateMedicalHistory(c *gin.Context) {
	var obj entity.Medicalhistory
	if err := c.ShouldBindJSON(&obj); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Create(&obj)
	c.JSON(http.StatusOK, obj)
}

func UpdateMedicalHistory(c *gin.Context) {
	id := c.Param("id")
	var obj entity.Medicalhistory
	if err := config.DB().First(&obj, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Medical history not found"})
		return
	}
	c.ShouldBindJSON(&obj)
	config.DB().Save(&obj)
	c.JSON(http.StatusOK, obj)
}

func DeleteMedicalHistory(c *gin.Context) {
	id := c.Param("id")
	config.DB().Delete(&entity.Medicalhistory{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
