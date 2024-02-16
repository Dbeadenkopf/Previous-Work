package database

import (
	"context"

	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// lookupStage create left outer join to a collection by matching with the "localField and foreignField" fields
// and output a new array with value in "as" key
var lookupStage = bson.D{{Key: "$lookup", Value: bson.D{
	{Key: "from", Value: "users"},
	{Key: "localField", Value: "userId"},
	{Key: "foreignField", Value: "_id"},
	{Key: "as", Value: "username"},
}}}

// unwindStage deconstructs an array from lookupStage as a document in the result set
var unwindStage = bson.D{{Key: "$unwind", Value: bson.D{
	{Key: "path", Value: "$username"},
	{Key: "preserveNullAndEmptyArrays", Value: true},
}}}

// project shows all the key values
var project = bson.D{{Key: "$project", Value: bson.D{
	{Key: "userId", Value: 1},
	{Key: "title", Value: 1},
	{Key: "comments", Value: 1},
	{Key: "text", Value: 1},
	{Key: "username", Value: "$username.username"},
}}}

// GetPosts gets all the posts
func GetPosts(ctx context.Context) ([]models.Post, error) {
	var posts []models.Post

	coll := pool.client.Database("t1cg-forum").Collection("posts")

	cur, err := coll.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, project})
	if err != nil {
		return posts, errors.Wrap(err)
	}
	if err = cur.All(context.TODO(), &posts); err != nil {
		return posts, errors.Wrap(err)
	}

	return posts, nil
}

// GetPostById gets a single post by its id
func GetPostById(ctx context.Context, postId string) ([]models.Post, error) {
	var post []models.Post

	// use the "posts" collection from the database
	coll := pool.client.Database("t1cg-forum").Collection("posts")
	// transform the "id" to objectID
	objectId, err := primitive.ObjectIDFromHex(postId)
	if err != nil {
		return post, errors.Wrap(err)
	}

	filter := bson.D{{Key: "$match", Value: bson.D{
		{Key: "_id", Value: objectId},
	}}}

	cur, err := coll.Aggregate(ctx, mongo.Pipeline{filter, lookupStage, unwindStage, project})
	if err != nil {
		return post, errors.Wrap(err)
	}
	// return the match data
	if err = cur.All(context.TODO(), &post); err != nil {
		return post, errors.Wrap(err)
	}

	return post, nil
}

func PostPost(ctx context.Context, newPost models.NewPost) error {
	coll := pool.client.Database("t1cg-forum").Collection("posts")

	_, err := coll.InsertOne(ctx, newPost)
	if err != nil {
		return errors.Wrap(err)
	}
	return nil
}

func UpdatePost(ctx context.Context, postId string, newPost models.NewPost) error {
	coll := pool.client.Database("t1cg-forum").Collection("posts")
	objectID, err := primitive.ObjectIDFromHex(postId)
	if err != nil {
		return errors.Wrap(err)
	}

	options := options.FindOneAndUpdate().SetReturnDocument(options.After)
	filter := bson.D{{Key: "_id", Value: objectID}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "title", Value: newPost.Title}, {Key: "text", Value: newPost.Text}}}}

	var updatedDocument bson.M

	err = coll.FindOneAndUpdate(context.TODO(), filter, update, options).Decode(&updatedDocument)
	if err != nil {
		return errors.Wrap(err)
	}

	return nil
}

func DeletePost(ctx context.Context, postId string) error {
	var post models.User

	coll := pool.client.Database("t1cg-forum").Collection("posts")
	objectID, err := primitive.ObjectIDFromHex(postId)
	if err != nil {
		return errors.Wrap(err)
	}
	filter := bson.D{{Key: "_id", Value: objectID}}

	err = coll.FindOneAndDelete(context.TODO(), filter).Decode(&post)
	if err != nil {
		return errors.Wrap(err)
	}

	return nil
}
