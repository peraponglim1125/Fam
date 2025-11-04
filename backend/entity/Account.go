package entity



type Account struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Thai_account string `json:"thai_account"`  // ✅ ต้องสะกดแบบนี้
	FirstName    string `json:"firstname"`
	LastName     string `json:"lastname"`
	Password     string `json:"password"`
	Phone        int    `json:"phone"`

	Patient        *Patient        `gorm:"foreignKey:AccountID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Doctorandnurse *Doctorandnurse `gorm:"foreignKey:AccountID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
