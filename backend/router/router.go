package router

import (
	"example.com/project_phone/controller"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	api := r.Group("/api")
	{
		// Auth
		api.POST("/login", controller.Login)
		api.POST("/register", controller.Register)

		// Patients
		api.GET("/patients", controller.GetPatients)
		api.POST("/patients", controller.CreatePatient)
		api.PUT("/patients/:id", controller.UpdatePatient)
		api.DELETE("/patients/:id", controller.DeletePatient)

		// Bloods
		api.GET("/bloods", controller.GetBloods)
		api.POST("/bloods", controller.CreateBlood)
		api.PUT("/bloods/:id", controller.UpdateBlood)
		api.DELETE("/bloods/:id", controller.DeleteBlood)

		// Appointments
		api.GET("/appointments", controller.GetAppointments)
		api.POST("/appointments", controller.CreateAppointment)
		api.PUT("/appointments/:id", controller.UpdateAppointment)
		api.DELETE("/appointments/:id", controller.DeleteAppointment)

		// Medical histories
		api.GET("/medicalhistories", controller.GetMedicalHistories)
		api.POST("/medicalhistories", controller.CreateMedicalHistory)
		api.PUT("/medicalhistories/:id", controller.UpdateMedicalHistory)
		api.DELETE("/medicalhistories/:id", controller.DeleteMedicalHistory)

		// Patient histories
		api.GET("/patienthistories", controller.GetPatientHistories)
		api.POST("/patienthistories", controller.CreatePatientHistory)
		api.PUT("/patienthistories/:id", controller.UpdatePatientHistory)
		api.DELETE("/patienthistories/:id", controller.DeletePatientHistory)
	}

	return r
}
