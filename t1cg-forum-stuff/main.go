// Package main API
//
//			Consumes:
//	 	- application/json
//
//	 	Produces:
//	 	- application/json
//
// swagger:meta
package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/t1cg/t1cg-forum/database"
	_ "github.com/t1cg/t1cg-forum/operations"
	"github.com/t1cg/t1cg-forum/router"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

//go:generate swagger generate spec

func main() {
	port := "8080"

	args := os.Args
	if len(args) > 1 {
		port = args[1]
	}

	if p := os.Getenv("PORT"); p != "" {
		port = p
	}

	// create database connection
	err := database.Start()
	if err != nil {
		log.Fatal(err)
	}
	// if the server ever exits, close the connection
	defer database.Close()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		Skipper:      middleware.DefaultSkipper,
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	e.Use(middleware.Recover())

	e.Logger.SetLevel(log.INFO)

	routes := router.GetRoutes()
	for _, route := range routes {
		switch route.Method {

		case http.MethodGet:
			e.GET(route.Endpoint, route.Handler, route.Middleware...)
		case http.MethodPost:
			e.POST(route.Endpoint, route.Handler, route.Middleware...)
		case http.MethodPut:
			e.PUT(route.Endpoint, route.Handler, route.Middleware...)
		case http.MethodDelete:
			e.DELETE(route.Endpoint, route.Handler, route.Middleware...)
		default:
			fmt.Printf("Not set up to handle method: %s", route.Method)
			os.Exit(1)

		}

	}

	log.Fatal(e.Start(":" + port))
}
