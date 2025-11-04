package controller

import (
	"net/http"
	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
)

// GET /patients
func GetPatients(c *gin.Context) {
	var patients []entity.Patient
	config.DB().Preload("Account").Find(&patients)
	c.JSON(http.StatusOK, patients)
}

// GET /patients/:id
func GetPatientByID(c *gin.Context) {
	id := c.Param("id")
	var patient entity.Patient
	if err := config.DB().Preload("Account").First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		return
	}
	c.JSON(http.StatusOK, patient)
}

// POST /patients
func CreatePatient(c *gin.Context) {
	var patient entity.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Create(&patient)
	c.JSON(http.StatusOK, patient)
}

// PUT /patients/:id
func UpdatePatient(c *gin.Context) {
	id := c.Param("id")
	var patient entity.Patient
	if err := config.DB().First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		return
	}
	c.ShouldBindJSON(&patient)
	config.DB().Save(&patient)
	c.JSON(http.StatusOK, patient)
}

// DELETE /patients/:id
func DeletePatient(c *gin.Context) {
	id := c.Param("id")
	config.DB().Delete(&entity.Patient{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}
