package errors

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// swagger:model CommonError
type Error struct {
	// The error message
	// example: Internal Server Error
	Message string `json:"message"`
	// The status code
	// example: 500
	Code int `json:"code,omitempty"`
}

func (e Error) Error() string {
	return e.Message
}

// New creates a new error that includes the http response code
func New(code int, message string) *Error {
	e := Error{Message: message, Code: code}
	return &e
}

// HandleResponse will take care of error logging and setting error responses
// for the request
func HandleResponse(ctx echo.Context, err error) error {
	ctx.Logger().Error(err.Error())
	var e *Error
	if errors.As(err, &e) {
		return ctx.JSON(e.Code, e)
	}
	return ctx.JSON(http.StatusInternalServerError, Error{Code: 500, Message: "Internal Server Error"})
}

// Wrap the current error with additional info to help trace the error. This
// adds the package name, function name, file name, and line number to the
// logged error output
func Wrap(err error) error {

	// Using `2` here since we want to get the info for the caller of this
	// function, not this function itself
	return fmt.Errorf("%s -> %w", GetFileData(2), err)

}
