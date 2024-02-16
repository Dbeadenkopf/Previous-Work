// This file will contain the go database framework

package config

import "fmt"

const (
	DBUser     = "TheHumanDave"
	DBPassword = "TheFlock#08"
	DBName     = "root"
	DBHost     = "0.0.0.0"
	DBPort     = "5432"
	DBType     = "postgres"
)

func GetDBType() string {
	return DBType
}

func GetPostgresConnectionString() string {
	dataBase := fmt.Sprintf("host=%s port=%s user%s dbname=%s password=%s sslmode=disable",
		DBHost,
		DBPort,
		DBUser,
		DBName,
		DBPassword)
	return dataBase
}
