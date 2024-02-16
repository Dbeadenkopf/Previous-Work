package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User

// the comments in the `` define how the struct should be marshaled
// and unmarshalled into bson and json. We need these since
// Go swagger and echo convert the structs into json, and
// mongodb uses bson.

// User contains users data
// swagger:model User
type User struct {
	// Id of the user
	//
	// Required: true
	Id primitive.ObjectID `json:"_id" bson:"_id"`
	// Username of the user
	//
	// Required: true
	Username string `json:"username" bson:"username"`
	// Email of the user
	//
	// Required: true
	Email string `json:"email" bson:"email"`
}
type NewUser struct {
	Username string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
}

// Post
type Post struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	UserId   primitive.ObjectID `json:"userId" bson:"userId"`
	Username string             `json:"username" bson:"username"`
	Title    string             `json:"title" bson:"title,omitempty"`
	Text     string             `json:"text" bson:"text,omitempty"`
	Comments []Comment          `json:"comments" bson:"comments,omitempty"`
}
type NewPost struct {
	UserId primitive.ObjectID `json:"userId" bson:"userId"`
	Title  string             `json:"title" bson:"title"`
	Text   string             `json:"text" bson:"text"`
}

// Favorite Post
type FavoritePost struct {
	Id     primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	UserId primitive.ObjectID `json:"userId" bson:"userId,omitempty"`
	PostId primitive.ObjectID `json:"postId" bson:"postId,omitempty"`
}
type NewFavoritePost struct {
	UserId primitive.ObjectID `json:"userId" bson:"userId,omitempty"`
	PostId primitive.ObjectID `json:"postId" bson:"postId,omitempty"`
}

// Comment
type Comment struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	UserId   primitive.ObjectID `json:"userId" bson:"userId"`
	Text     string             `json:"text" bson:"text"`
	CreateAt string             `json:"createAt" bson:"createAt"`
}
type NewComment struct {
	PostId primitive.ObjectID `json:"postId" bson:"postId"`
	UserId primitive.ObjectID `json:"userId" bson:"userId"`
	Text   string             `json:"text" bson:"text"`
}
type UpdateComment struct {
	UserId primitive.ObjectID `json:"userId" bson:"userId"`
	Text   string             `json:"text" bson:"text"`
}
