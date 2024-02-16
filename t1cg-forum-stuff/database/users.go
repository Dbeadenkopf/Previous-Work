package database

import (
	"context"
	"fmt"

	"github.com/t1cg/t1cg-forum/errors"
	"github.com/t1cg/t1cg-forum/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetUsers(ctx context.Context) ([]models.User, error) {
	var users []models.User

	coll := pool.client.Database("t1cg-forum").Collection("users")
	cursor, err := coll.Find(context.TODO(), bson.D{})
	if err != nil {
		return users, errors.Wrap(err)
	}

	if err = cursor.All(context.TODO(), &users); err != nil {
		return users, errors.Wrap(err)
	}
	for _, user := range users {
		fmt.Println(user)
	}

	return users, nil
}

// GetUserByID: returns a user from the database
func GetUserByID(ctx context.Context, userID string) (models.User, error) {
	var user models.User

	coll := pool.client.Database("t1cg-forum").Collection("users")
	// converts a string to mongo's object ID format
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return user, errors.Wrap(err)
	}
	filter := bson.D{{Key: "_id", Value: objectID}}

	err = coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		return user, errors.Wrap(err)
	}
	fmt.Println(user)
	return user, nil
}

func UpdateUserById(ctx context.Context, userId string, newUser models.NewUser) error {
	coll := pool.client.Database("t1cg-forum").Collection("users")
	objectID, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return errors.Wrap(err)
	}

	options := options.FindOneAndUpdate().SetReturnDocument(options.After)
	filter := bson.D{{Key: "_id", Value: objectID}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "username", Value: newUser.Username}, {Key: "email", Value: newUser.Email}}}}

	var updatedDocument bson.M

	err = coll.FindOneAndUpdate(context.TODO(), filter, update, options).Decode(&updatedDocument)
	if err != nil {
		return errors.Wrap(err)
	}

	fmt.Println("User successfully updated to", updatedDocument)
	return nil
}

func PostUser(ctx context.Context, newUser models.NewUser) error {
	coll := pool.client.Database("t1cg-forum").Collection("users")
	_, err := coll.InsertOne(ctx, newUser)
	if err != nil {
		return errors.Wrap(err)
	}
	return nil
}

func DeleteUser(ctx context.Context, userId string) error {
	var user models.User

	coll := pool.client.Database("t1cg-forum").Collection("users")
	objectID, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return errors.Wrap(err)
	}
	filter := bson.D{{Key: "_id", Value: objectID}}

	err = coll.FindOneAndDelete(context.TODO(), filter).Decode(&user)
	if err != nil {
		return errors.Wrap(err)
	}

	fmt.Println("Successfully deleted user", user)
	return nil
}
