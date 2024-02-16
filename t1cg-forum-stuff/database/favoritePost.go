package database

import (
	"context"

	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// PostFavoritePost post a favorite posts to the user
func PostFavoritePost(ctx context.Context, newFavoritePost models.NewFavoritePost) error {

	// connect to the database
	coll := pool.client.Database("t1cg-forum").Collection("users")

	//filter userId
	filter := bson.D{{Key: "_id", Value: newFavoritePost.UserId}}
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)

	// Push to the doc with unique comment id
	update := bson.D{{Key: "$push", Value: bson.D{{
		Key: "favoritePosts", Value: bson.D{
			{Key: "_id", Value: primitive.NewObjectID()},
			{Key: "userId", Value: newFavoritePost.UserId},
			{Key: "postId", Value: newFavoritePost.PostId},
		}},
	}}}

	var updatedDocument bson.M
	// post the data
	err := coll.FindOneAndUpdate(ctx, filter, update, options).Decode(&updatedDocument)
	if err != nil {
		return errors.Wrap(err)
	}
	return nil
}
