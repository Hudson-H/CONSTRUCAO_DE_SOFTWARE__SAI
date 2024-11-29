package repository

import (
	"database/sql"
	"fmt"
)

type Example struct {
	db *sql.DB
}

func CreateExampleRepository(db *sql.DB) *Example {
	er := Example{
		db: db,
	}

	return &er
}

func (er *Example) Teste() {
	res, err := er.db.Exec("select * from teste")

	if err != nil {
		panic(err)
	}

	fmt.Println(res)
}
