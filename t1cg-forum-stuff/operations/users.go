package operations

import (
	"fmt"
	"net/http"

	"github.com/t1cg/t1cg-forum/database"
	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"
	"github.com/t1cg/t1cg-forum/router"

	"github.com/labstack/echo/v4"
)

// init registers route information with the router. all new endpoints must
// be added to this function
func init() {
	router.Register(http.MethodGet, "/users", GetUsersHandler)
	router.Register(http.MethodGet, "/users/:id", GetUserByIDHandler)
	router.Register(http.MethodPost, "/users", PostUsersHandler)
	router.Register(http.MethodPut, "/users/:id", PutUsersHandler)
	router.Register(http.MethodDelete, "/users/:id", DeleteUserHandler)
}

// swagger:route GET /users/{id} Users users
//
// # Get user by ID
//
// This endpoint will return a user by their user ID
//
// Parameters:
// + name: id
//   type: string
//   in: path
//   required: true
//
//	Responses:
//	 200: body:UserGetByIDResponse
//	 500: body:CommonError

// UserGetByIDResponse contains the response data for a /users/{id} GET request
// swagger:model UserGetByIDResponse
type UserGetByIDResponse struct {
	// A User
	//
	// example: {"_id": "1111", "username": "Joe", "email":"example@gmail.com"}
	User models.User `json:"user,omitempty"`
}

// GetUserByIDHandler gets the user data from the db
func GetUserByIDHandler(ctx echo.Context) error {
	userID := ctx.Param("id")
	user, err := database.GetUserByID(ctx.Request().Context(), userID)
	if err != nil {
		fmt.Println(err)
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, UserGetByIDResponse{User: user})
}

// swagger:route GET /users Users users
//
// # Get all users
//
// This endpoint will return all users in the db
//
//	Responses:
//	 200: body:UsersGetResponse
//	 500: body:CommonError

// UsersGetResponse contains the response data for a /users GET request
// swagger:model UsersGetResponse
type UsersGetResponse struct {
	Users []models.User `json:"user,omitempty"`
}

// GetUsersHandler gets all users
func GetUsersHandler(ctx echo.Context) error {
	users, err := database.GetUsers(ctx.Request().Context())
	if err != nil {
		fmt.Println(err)
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, UsersGetResponse{Users: users})
}

// swagger:route POST /users Users users
//
// # Create a new user
//
// This endpoint will create a new user and return the user
// with their id
//
// Parameters:
// + name: username
//   type: string
//   in: body
//   required: true
// + name: email
//   type: string
//   in: body
//   required: true
//
//	Responses:
//	 200: body:UsersPostResponse
//	 500: body:CommonError

// UsersPostResponse contains the response data for a /users POST request
// swagger:model UsersPostResponse
type UsersPostResponse struct {
	StatusOK bool `json:"status_ok"`
}

func PostUsersHandler(ctx echo.Context) error {
	var params models.NewUser
	err := ctx.Bind(&params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	err = database.PostUser(ctx.Request().Context(), params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}

	return ctx.JSON(http.StatusOK, UsersPostResponse{StatusOK: true})
}

// swagger:route PUT /users/{id} Users users
//
// # Update a users data
//
// This endpoint will find a user and update their information
// with their id
//
// Parameters:
// + name: username
//   type: string
//   in: body
//   required: true
// + name: email
//   type: string
//   in: body
//   required: true
// + name: id
//   type: string
//   in: path
//   required: true
//
//	Responses:
//	 200: body:UsersPutResponse
//	 500: body:CommonError

// UsersPutResponse contains the response data for a /users PUT request
// swagger:model UsersPutResponse

type UsersPutResponse struct {
	StatusOK bool `json:"status_ok"`
}

func PutUsersHandler(ctx echo.Context) error {
	userID := ctx.Param("id")
	var params models.NewUser
	err := ctx.Bind(&params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	err = database.UpdateUserById(ctx.Request().Context(), userID, params)
	if err != nil {
		fmt.Println(err)
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, UsersPutResponse{StatusOK: true})
}

type UserDeleteReponse struct {
	StatusOK bool `json:"status_ok"`
}

func DeleteUserHandler(ctx echo.Context) error {
	userID := ctx.Param("id")
	err := database.DeleteUser(ctx.Request().Context(), userID)
	if err != nil {
		fmt.Println(err)
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, UserDeleteReponse{StatusOK: true})
}
