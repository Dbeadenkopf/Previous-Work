package operations

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/t1cg/t1cg-forum/database"
	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"
	"github.com/t1cg/t1cg-forum/router"
)

func init() {
	router.Register(http.MethodPost, "/favorite", PostFavoritePostHandler)
}

type PostFavoritePostResponse struct {
	StatusOK bool `json:"status_ok"`
}

// PostFavoritePostHandler posts the user's favorite post request
func PostFavoritePostHandler(ctx echo.Context) error {
	var params models.NewFavoritePost

	// Bind incoming data
	if err := ctx.Bind(&params); err != nil {
		return errors.HandleResponse(ctx, err)
	}
	// Pass data to the database func
	err := database.PostFavoritePost(ctx.Request().Context(), params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusCreated, PostCommentsResponse{StatusOK: true})
}
