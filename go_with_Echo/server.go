package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))


	// Routing some information
	e.GET("/users/:id", getUser)
	func getUser(c echo.Context)error{
		id := c.Param("id")
		return c.String(http.StatusOK, id)
	}

	
}

	
	

	


