package operations

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/t1cg/t1cg-forum/database"
	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"
	"github.com/t1cg/t1cg-forum/router"
)

func init() {
	router.Register(http.MethodPost, "/comment", PostCommentsHandler)
	router.Register(http.MethodGet, "/comments/:postId", GetCommentsHandler)
	router.Register(http.MethodGet, "/comment/:commentId", GetOneCommentHandler)
	router.Register(http.MethodPut, "/comment/:commentId", PutCommentsHandler)
	router.Register(http.MethodDelete, "/comment/:commentId", DeleteCommentsHandler)
}

type PostCommentsResponse struct {
	StatusOK bool `json:"status_ok"`
}

// PostCommentsHandler create a comment to the post
func PostCommentsHandler(ctx echo.Context) error {
	var params models.NewComment

	// Bind incoming data
	if err := ctx.Bind(&params); err != nil {
		return errors.HandleResponse(ctx, err)
	}
	// Pass data to the database func
	err := database.PostComments(ctx.Request().Context(), params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}

	return ctx.JSON(http.StatusCreated, PostCommentsResponse{StatusOK: true})
}

type GetCommentsResponse struct {
	Comments []models.Comment `json:"comments"`
}

// GetCommentsHandler get a list of comments on a given post
func GetCommentsHandler(ctx echo.Context) error {
	postId := ctx.Param("postId")

	comments, err := database.GetComments(ctx.Request().Context(), postId)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, GetCommentsResponse{Comments: comments})
}

type PutCommentResponse struct {
	StatusOk bool `json:"status_ok"`
}

// PutCommentsHandler allow a user to update the comment
func PutCommentsHandler(ctx echo.Context) error {
	commentId := ctx.Param("commentId")

	var params models.UpdateComment
	err := ctx.Bind(&params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	err = database.UpdateComment(context.TODO(), commentId, params)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, PutCommentResponse{StatusOk: true})
}

type DeleteCommentResponse struct {
	StatusOk bool `json:"status_ok"`
}

// DeleteCommentsHandler allow a user to delete the comment
func DeleteCommentsHandler(ctx echo.Context) error {
	commentId := ctx.Param("commentId")

	err := database.DeleteComment(context.TODO(), commentId)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}

	return ctx.JSON(http.StatusOK, DeleteCommentResponse{StatusOk: true})
}

type GetOneCommentResponse struct {
	Comment models.Comment `json:"comment"`
}

// GetOneCommentHandler allow a user to gets a specific comment
func GetOneCommentHandler(ctx echo.Context) error {
	commentId := ctx.Param("commentId")

	comment, err := database.GetOneComment(context.TODO(), commentId)
	if err != nil {
		return errors.HandleResponse(ctx, err)
	}
	return ctx.JSON(http.StatusOK, GetOneCommentResponse{Comment: comment})
}
