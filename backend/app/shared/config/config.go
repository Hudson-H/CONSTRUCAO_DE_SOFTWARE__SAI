package config

var Configuration = &Config{
	SERVER_PORT: "8080",

	DB_USER:     "root",
	DB_PASSWORD: "root",
	DB_NAME:     "SAI",
}

type Config struct {
	SERVER_PORT string `json:"SERVER_PORT"`
	DB_USER     string `json:"DB_USER"`
	DB_PASSWORD string `json:"DB_PASSWORD"`
	DB_NAME     string `json:"DB_NAME"`
}
