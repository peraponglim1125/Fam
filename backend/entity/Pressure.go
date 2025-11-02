package entity
import (
   "time"

   "gorm.io/gorm"
)
type Pressure struct {
   gorm.Model
   date         time.Time    "json:date"
   LastName     string    	"json:lastname"
   Password     string    	"json:password"
   Phone        string     	"json:phone"

  PatientID uint    `json:"patientID"` // FK → ชี้ไปที่ Patient.ID
  Patient   *Patient `gorm:"foreignKey:PatientID;references:ID"`
}