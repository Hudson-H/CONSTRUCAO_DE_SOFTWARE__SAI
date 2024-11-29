package main

import (
	"net/http"
	"sai-backend/app/route"
)

func main() {
	http.ListenAndServe("127.0.0.1:8080", route.SetupRoutes())
}
