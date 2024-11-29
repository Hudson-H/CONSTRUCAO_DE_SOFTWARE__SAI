package main

import (
	"net/http"
	"sai-backend/app/route"
	"sai-backend/app/shared/config"
	"sai-backend/app/shared/database"
)

func main() {
	db := database.CreateMySQLConnection(database.DBInfo{
		User:     config.Configuration.DB_USER,
		Password: config.Configuration.DB_PASSWORD,
		DBName:   config.Configuration.DB_NAME,
	})

	http.ListenAndServe(
		"127.0.0.1:"+config.Configuration.SERVER_PORT,
		route.SetupRoutes(db),
	)
}
