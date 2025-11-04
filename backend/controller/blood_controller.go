package controller

import (
	"net/http"
	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
)

// ✅ ดึงข้อมูลทั้งหมด
func GetBloods(c *gin.Context) {
	var bloods []entity.Blood
	config.DB().Find(&bloods)
	c.JSON(http.StatusOK, bloods)
}

// ✅ เพิ่มข้อมูลใหม่
func CreateBlood(c *gin.Context) {
	var blood entity.Blood
	if err := c.ShouldBindJSON(&blood); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Create(&blood)
	c.JSON(http.StatusOK, blood)
}

// ✅ แก้ไขข้อมูล
func UpdateBlood(c *gin.Context) {
	id := c.Param("id")
	var blood entity.Blood
	if err := config.DB().First(&blood, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบข้อมูล"})
		return
	}
	if err := c.ShouldBindJSON(&blood); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB().Save(&blood)
	c.JSON(http.StatusOK, blood)
}

// ✅ ลบข้อมูล
func DeleteBlood(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB().Delete(&entity.Blood{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ลบไม่สำเร็จ"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "ลบสำเร็จ"})
}
