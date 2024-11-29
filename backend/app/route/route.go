package route

import (
	"database/sql"
	"net/http"
	"sai-backend/app/controller"
	"sai-backend/app/middlewares/logrequests"
	"sai-backend/app/repository"
	"sai-backend/app/service"

	"github.com/julienschmidt/httprouter"
)

func SetupRoutes(db *sql.DB) http.Handler {
	return middleware(routes(db))
}

func routes(db *sql.DB) *httprouter.Router {
	router := httprouter.New()

	exampleRepository := repository.CreateExampleRepository(db)
	exampleService := service.CreateExampleService(exampleRepository)

	router.GET("/teste", controller.ExampleGETHandler(exampleService))

	return router
}

func middleware(h http.Handler) http.Handler {
	h = logrequests.Handler(h)

	return h
}
