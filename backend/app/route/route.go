package route

import (
	"net/http"
	"sai-backend/app/controller"
	"sai-backend/app/middlewares/logrequests"
	"sai-backend/app/repository"
	"sai-backend/app/service"
	"sai-backend/app/shared/database"

	"github.com/julienschmidt/httprouter"
)

func SetupRoutes() http.Handler {
	return middleware(routes())
}

func routes() *httprouter.Router {
	router := httprouter.New()

	db := database.CreateMySQLConnection(database.DBInfo{
		User:     "root",
		Password: "root",
		DBName:   "SAI",
	})

	exampleRepository := repository.CreateExampleRepository(db)
	exampleService := service.CreateExampleService(exampleRepository)

	router.GET("/teste", controller.ExampleGETHandler(exampleService))

	return router
}

func middleware(h http.Handler) http.Handler {
	h = logrequests.Handler(h)

	return h
}
