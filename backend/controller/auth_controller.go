package controller

import (
	"net/http"
	"time"

	"example.com/project_phone/config"
	"example.com/project_phone/entity"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

var jwtKey = []byte("supersecretkey")

func Login(c *gin.Context) {
	var login entity.Account
	var dbAccount entity.Account

	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจ username + password
	err := config.DB().Where("thai_account = ? AND password = ?", login.Thai_account, login.Password).First(&dbAccount).Error
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"})
		return
	}

	// สร้าง token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       dbAccount.ID,
		"username": dbAccount.Thai_account,
		"exp":      time.Now().Add(2 * time.Hour).Unix(),
	})

	tokenString, _ := token.SignedString(jwtKey)

	c.JSON(http.StatusOK, gin.H{
		"message": "เข้าสู่ระบบสำเร็จ",
		"token":   tokenString,
	})
}


// ✅ ฟังก์ชันสมัครสมาชิก
func Register(c *gin.Context) {
	var input entity.Account

	// รับค่าจาก JSON
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจว่าชื่อผู้ใช้นี้มีอยู่แล้วหรือยัง
	var existing entity.Account
	if err := config.DB().Where("thai_account = ?", input.Thai_account).First(&existing).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ชื่อผู้ใช้นี้มีอยู่แล้ว"})
		return
	}

	// บันทึกลงฐานข้อมูล
	if err := config.DB().Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "สมัครไม่สำเร็จ"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "สมัครสมาชิกสำเร็จ",
		"account": input,
	})
}
