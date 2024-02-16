package operations

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/t1cg/t1cg-forum/database"
	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"
	"github.com/t1cg/t1cg-forum/router"
)

// init registers route information with the router. all new endpoints must
// be added to this function
func init() {
	router.Register(http.MethodPost, "/posts", PostPostsHandler)
	router.Register(http.MethodGet, "/posts", GetPostsHandler)
	router.Register(http.MethodPut, "/posts/:id", PutPostsHandler)
	router.Register(http.MethodDelete, "/posts/:id", DeletePostHandler)
	router.Register(http.MethodGet, "/posts/:id", GetPostByIDHandler)
}

// swagger:route GET /posts/{id} Posts posts
//
// # Get post by ID
//
// This endpoint will return a post by its post ID
//
// Parameters:
// + name: id
//   type: string
//   in: path
//   required: true
//
//	Responses:
//	 200: body:PostGetByIDResponse
//	 500: body:CommonError

// PostGetByIDResponse contains the response data for a /posts/{id} GET request
// swagger:model PostGetByIDResponse
type PostGetByIDResponse struct {
	Post []models.Post `json:"posts"`
}

// GetPostByIDHandler gets the post data from the db
func GetPostByIDHandler(ctx echo.Context) error {
	postId := ctx.Param("id") // store "id" from URL
	post, err := database.GetPostById(ctx.Request().Context(), postId)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, PostGetByIDResponse{Post: post})
}

// swagger:route GET /posts Posts posts
//
// # Get all posts
//
// This endpoint will return all posts in the db
//
//	Responses:
//	 200: body:PostsGetResponse
//	 500: body:CommonError

// PostsGetResponse contains the response data for a /posts GET request
// swagger:model PostsGetResponse
type PostsGetResponse struct {
	Posts []models.Post `json:"posts"`
}

// GetPostsHandler gets all posts
func GetPostsHandler(ctx echo.Context) error {
	posts, err := database.GetPosts(ctx.Request().Context())
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, PostsGetResponse{Posts: posts})
}

// swagger:route POST /posts Posts posts
//
// # Create a new post
//
// This endpoint will create a new post and return the post
// with their id
//
// Parameters:
// + name: title
//   type: string
//   in: body
//   required: true
// + name: body
//   type: string
//   in: body
//   required: true
//
//	Responses:
//	 200: body:PostsPostResponse
//	 500: body:CommonError

// PostsPostResponse contains the response data for a /posts POST request
// swagger:model PostsPostResponse
type PostsPostResponse struct {
	StatusOK bool `json:"status_ok"`
}

func PostPostsHandler(ctx echo.Context) error {
	var params models.NewPost
	err := ctx.Bind(&params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	err = database.PostPost(ctx.Request().Context(), params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}

	return ctx.JSON(http.StatusOK, PostsPostResponse{StatusOK: true})

}

// swagger:route PUT /posts/{id} Posts posts
//
// # Update a posts data
//
// This endpoint will find a post and update their information
// with their id
//
// Parameters:
// + name: title
//   type: string
//   in: body
//   required: true
// + name: body
//   type: string
//   in: body
//   required: true
// + name: id
//   type: string
//   in: path
//   required: true
//
//	Responses:
//	 200: body:PostsPutResponse
//	 500: body:CommonError

// PostsPutResponse contains the response data for a /posts PUT request
// swagger:model PostsPutResponse
type PostsPutResponse struct {
	StatusOK bool `json:"status_ok"`
}

func PutPostsHandler(ctx echo.Context) error {
	postId := ctx.Param("id")
	var params models.NewPost
	err := ctx.Bind(&params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	err = database.UpdatePost(ctx.Request().Context(), postId, params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, PostsPostResponse{StatusOK: true})
}

type PostDeleteReponse struct {
	StatusOK bool `json:"status_ok"`
}

func DeletePostHandler(ctx echo.Context) error {
	postId := ctx.Param("id")
	err := database.DeletePost(ctx.Request().Context(), postId)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, PostDeleteReponse{StatusOK: true})
}
