package controller

import (
	"net/http"
	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
)

func GetAppointments(c *gin.Context) {
	var data []entity.Appointment
	config.DB().Find(&data)
	c.JSON(http.StatusOK, data)
}

func GetAppointmentByID(c *gin.Context) {
	id := c.Param("id")
	var obj entity.Appointment
	if err := config.DB().First(&obj, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Appointment not found"})
		return
	}
	c.JSON(http.StatusOK, obj)
}

func CreateAppointment(c *gin.Context) {
	var obj entity.Appointment
	if err := c.ShouldBindJSON(&obj); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Create(&obj)
	c.JSON(http.StatusOK, obj)
}

func UpdateAppointment(c *gin.Context) {
	id := c.Param("id")
	var obj entity.Appointment
	if err := config.DB().First(&obj, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Appointment not found"})
		return
	}
	c.ShouldBindJSON(&obj)
	config.DB().Save(&obj)
	c.JSON(http.StatusOK, obj)
}

func DeleteAppointment(c *gin.Context) {
	id := c.Param("id")
	config.DB().Delete(&entity.Appointment{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
