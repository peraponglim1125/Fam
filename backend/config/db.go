package config

import (
	"fmt"
	"example.com/project_phone/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("❌ failed to connect database")
	}
	fmt.Println("✅ Connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Account{},
		&entity.Appointment{},
		&entity.Blood{},
		&entity.Doctorandnurse{},
		&entity.Foodandexercise{},
		&entity.Patient{},
		&entity.Patienthistory{},
		&entity.Medicalhistory{},
		&entity.Medicine{},
		&entity.Pressure{},
		&entity.Sugar{},
	)

	// 🧩 เพิ่มข้อมูลตั้งต้นเพื่อทดสอบ login
	var count int64
	db.Model(&entity.Account{}).Count(&count)
	if count == 0 {
		db.Create(&entity.Account{
			Thai_account: "admin",
			FirstName:    "คุณท่าน",
			LastName:     "เฟม",
			Password:     "1234",
			Phone:        999999999,
		})
		fmt.Println("✅ Seeded default admin account: admin / 1234")
	} else {
		fmt.Println("✅ Database already seeded")
	}
}
