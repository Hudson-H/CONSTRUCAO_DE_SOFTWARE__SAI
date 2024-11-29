package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

type DBInfo struct {
	User     string
	Password string
	DBName   string
}

func (info *DBInfo) getDSN() string {
	return info.User + ":" + info.Password + "@/" + info.DBName
}

func CreateMySQLConnection(info DBInfo) *sql.DB {
	db, err := sql.Open("mysql", info.getDSN())
	if err != nil {
		panic(err)
	}

	return db
}
