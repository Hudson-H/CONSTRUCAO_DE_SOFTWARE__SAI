package config

var config = &Config{
	SERVER_PORT: "8080",
}

type Config struct {
	SERVER_PORT string `json:"SERVER_PORT"`
}
