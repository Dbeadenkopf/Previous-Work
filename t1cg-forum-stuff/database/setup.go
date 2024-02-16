package database

import (
	"context"
	"os"
	"time"

	"github.com/t1cg/t1cg-forum/errors"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mongodb"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// connectionPool represents the mongodb connection pool as well as the function
// to close the connection and the context.
type connectionPool struct {
	client *mongo.Client
	ctx    context.Context
	cancel context.CancelFunc
}

// db is an interface that defines the methods the connectionPool will implement
type db interface {
	connect(uri string) error
	close()
	migrate() error
	ping() error
}

// Initialize package variable. To be set by Start()
var pool connectionPool = connectionPool{}

// close closes mongoDB connection and cancel context.
func (p connectionPool) close() {
	defer p.cancel()
	defer func() {
		err := p.client.Disconnect(p.ctx)
		if err != nil {
			panic(err)
		}
	}()
}

// connect creates a mongodb connection
func (p connectionPool) connect(uri string) error {
	// ctx will be used to set deadline for process, here
	// deadline will of 30 seconds.
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		// cancel context
		cancel()
		return errors.Wrap(err)
	}
	// set package level variable
	pool = connectionPool{
		ctx:    ctx,
		cancel: cancel,
		client: client,
	}
	return nil
}

// migrate calls golang-migrate functions to make sure the db is up to date
// with the migration files in /database/migrations
func (p connectionPool) migrate(dbName, migrationPath string) error {
	driver, err := mongodb.WithInstance(p.client, &mongodb.Config{DatabaseName: dbName})
	if err != nil {
		return errors.Wrap(err)
	}
	m, err := migrate.NewWithDatabaseInstance(migrationPath, "mongodb", driver)
	if err != nil {
		return errors.Wrap(err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return errors.Wrap(err)
	}
	return nil
}

// ping tests the connection to the db
func (p connectionPool) ping() error {
	err := p.client.Ping(p.ctx, readpref.Primary())
	if err != nil {
		return err
	}
	return nil
}

/*

Exported Functions: the above functions are private and limited to use in the database package. In
order to allow the main function to initiate the database connection and properly close it, we need
functions that can be used by other packages.

*/

// Start calls the db functions to set up a connection to the db
func Start() error {
	// create mongodb connection
	err := pool.connect(os.Getenv("FORUM_DB_URI"))
	if err != nil {
		return errors.Wrap(err)
	}
	// check connection
	err = pool.ping()
	if err != nil {
		return errors.Wrap(err)
	}
	// migrate db
	err = pool.migrate("t1cg-forum", "file://database/migrations")
	if err != nil {
		return errors.Wrap(err)
	}
	return nil
}

// Close calls the db function to close the connection
func Close() {
	pool.close()
}
