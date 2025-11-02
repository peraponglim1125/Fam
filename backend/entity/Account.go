package entity
import (

   "gorm.io/gorm"
)
type Account struct {
   gorm.Model
   Thai_account  string    "json:thai_account"
   FirstName    string    "json:firstname"
   LastName     string    "json:lastname"
   Password     string    "json:password"
   Phone        uint      "json:phone"

   Patient *Patient `gorm:"foreignKey:AccountID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
   Doctorandnurse *Doctorandnurse `gorm:"foreignKey:AccountID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
