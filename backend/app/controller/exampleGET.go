package controller

import (
	"net/http"
	"sai-backend/app/service"

	"github.com/julienschmidt/httprouter"
)

var _exampleService *service.Example

func ExampleGETHandler(exampleService *service.Example) httprouter.Handle {
	_exampleService = exampleService

	return handle
}

func handle(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	_exampleService.Teste()
}
