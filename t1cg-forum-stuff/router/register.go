package router

import (
	"fmt"
	"os"

	"github.com/labstack/echo/v4"
)

type Route struct {
	Method     string
	Endpoint   string
	Handler    echo.HandlerFunc
	Middleware []echo.MiddlewareFunc
}

var routes = map[string]*Route{}

func Register(method, endpoint string, handler echo.HandlerFunc, m ...echo.MiddlewareFunc) {

	key := method + endpoint

	if routes[key] != nil {
		fmt.Printf("Can not register a route more than once. %s: %s", method, endpoint)
		os.Exit(1)
	}

	newRoute := Route{
		Method:     method,
		Endpoint:   endpoint,
		Handler:    handler,
		Middleware: m,
	}

	routes[key] = &newRoute

}

func GetRoutes() map[string]*Route {
	return routes
}
