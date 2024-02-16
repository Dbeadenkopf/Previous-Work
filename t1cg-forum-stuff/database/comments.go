package database

import (
	"context"
	"fmt"
	"time"

	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// PostComments insert a comment field to the existing post
func PostComments(ctx context.Context, comments models.NewComment) error {
	time := time.Now().Format(time.ANSIC) // current time for posting comment
	// Use the "posts" collection from the database
	postColl := pool.client.Database("t1cg-forum").Collection("posts")
	// Find the memory location of the postId
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)
	// filter the postId
	filter := bson.D{{Key: "_id", Value: comments.PostId}}
	// Push to the doc with unique comment id
	update := bson.D{{Key: "$push", Value: bson.D{{
		Key: "comments", Value: bson.D{
			{Key: "_id", Value: primitive.NewObjectID()},
			{Key: "userId", Value: comments.UserId},
			{Key: "text", Value: comments.Text},
			{Key: "createAt", Value: time},
		}},
	}}}

	var updatedDocument bson.M
	// Update the doc
	err := postColl.FindOneAndUpdate(context.TODO(), filter, update, options).Decode(&updatedDocument)
	if err != nil {
		return errors.Wrap(err)
	}

	return nil
}

// GetComments return a list of comments from a post
func GetComments(ctx context.Context, postId string) ([]models.Comment, error) {
	var posts models.Post

	// Connect to the database
	postColl := pool.client.Database("t1cg-forum").Collection("posts")
	// Transform string postId to primitive data type
	objectId, err := primitive.ObjectIDFromHex(postId)
	if err != nil {
		return posts.Comments, errors.Wrap(err)
	}
	// Filter the postId
	filter := bson.D{{Key: "_id", Value: objectId}}
	// Find match post id
	err = postColl.FindOne(context.TODO(), filter).Decode(&posts)
	if err != nil {
		return posts.Comments, errors.Wrap(err)
	}
	return posts.Comments, nil
}

// UpdateComment update the comment in a post
func UpdateComment(ctx context.Context, commentId string, updateComment models.UpdateComment) error {
	time := time.Now().Format(time.ANSIC) // current time for posting comment

	// Get the comment from db
	postColl := pool.client.Database("t1cg-forum").Collection("posts")
	objectId, err := primitive.ObjectIDFromHex(commentId)
	if err != nil {
		return errors.Wrap(err)
	}

	// Filter to a comment field with the id
	filter := bson.D{{Key: "comments._id", Value: objectId}}
	// Update the comment text
	update := bson.D{{Key: "$set", Value: bson.D{
		{Key: "comments.$.text", Value: updateComment.Text},
		{Key: "comments.$.createAt", Value: time},
	}}}

	// Return update db
	_, err = postColl.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return errors.Wrap(err)
	}

	return nil
}

// DeleteComment remove a comment from a post
func DeleteComment(ctx context.Context, commentId string) error {

	// connect to db
	postColl := pool.client.Database("t1cg-forum").Collection("posts")
	objectId, err := primitive.ObjectIDFromHex(commentId)
	if err != nil {
		return errors.Wrap(err)
	}
	// find comment
	filter := bson.D{{Key: "comments._id", Value: objectId}}
	remove := bson.D{{Key: "$pull", Value: bson.D{
		{Key: "comments", Value: bson.D{{Key: "_id", Value: objectId}}},
	}}}
	// remove comment a comment field
	result, err := postColl.UpdateOne(context.TODO(), filter, remove)
	if err != nil {
		return errors.Wrap(err)
	}
	fmt.Printf("Successfully removed %v field\n", result.ModifiedCount)

	return nil
}

// GetOneComment get a comment from a post
func GetOneComment(ctx context.Context, commentId string) (models.Comment, error) {
	var comment models.Post

	// connect to db
	postColl := pool.client.Database("t1cg-forum").Collection("posts")
	objectId, err := primitive.ObjectIDFromHex(commentId)
	if err != nil {
		return comment.Comments[0], errors.Wrap(err)
	}
	// find a comment id
	filter := bson.D{{Key: "comments._id", Value: objectId}}
	//add options to get only the comments field
	ops := options.FindOne()
	ops.Projection = bson.D{
		{Key: "_id", Value: 0},
		{Key: "comments.$", Value: 1},
	}

	err = postColl.FindOne(context.TODO(), filter, ops).Decode(&comment)
	if err != nil {
		return comment.Comments[0], errors.Wrap(err)
	}

	return comment.Comments[0], nil
}
