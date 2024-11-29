package controller

import (
	"net/http"
	"sai-backend/app/service"

	"github.com/julienschmidt/httprouter"
)

func ExampleGETHandler(exampleService *service.ExampleService) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		exampleService.Teste()
	}
}
