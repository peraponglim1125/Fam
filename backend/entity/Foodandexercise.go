package entity
import (
   "time"

   "gorm.io/gorm"
)
type Foodandexercise struct {
   gorm.Model
   date    				time.Time    "json:date"
   Food     			string       "json:food"
   Exercise_time     	time.Time   " json:exercise_time"
   type_of_exercise     string       "json:type_of_exercise"
   
   PatientID uint    `json:"patientID"` // FK → ชี้ไปที่ Patient.ID
   Patient   *Patient `gorm:"foreignKey:PatientID;references:ID"` 
}