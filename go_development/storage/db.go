package storage

import (
	"github.com/jinzhu/gorm"
	"gorm.io/gorm"
)

var DB *gorm.DB

func NewDB(params ...string) *gorm.DB {
	return DB
}
