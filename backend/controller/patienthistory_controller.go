package controller

import (
	"net/http"
	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
)

func GetPatientHistories(c *gin.Context) {
	var data []entity.Patienthistory
	config.DB().Find(&data)
	c.JSON(http.StatusOK, data)
}

func CreatePatientHistory(c *gin.Context) {
	var obj entity.Patienthistory
	if err := c.ShouldBindJSON(&obj); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Create(&obj)
	c.JSON(http.StatusOK, obj)
}

func UpdatePatientHistory(c *gin.Context) {
	id := c.Param("id")
	var obj entity.Patienthistory
	if err := config.DB().First(&obj, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient history not found"})
		return
	}
	c.ShouldBindJSON(&obj)
	config.DB().Save(&obj)
	c.JSON(http.StatusOK, obj)
}

func DeletePatientHistory(c *gin.Context) {
	id := c.Param("id")
	config.DB().Delete(&entity.Patienthistory{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
