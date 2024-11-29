package repository

import (
	"database/sql"
	"fmt"
)

type ExampleRepository struct {
	db *sql.DB
}

func CreateExampleRepository(db *sql.DB) *ExampleRepository {
	er := ExampleRepository{
		db: db,
	}

	return &er
}

func (er *ExampleRepository) Teste() {
	res, err := er.db.Exec("select * from teste")

	if err != nil {
		panic(err)
	}

	fmt.Println(res)
}
