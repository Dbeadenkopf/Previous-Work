# Getting Started:

### Install Go, Swagger, Mongodb

```
brew update

brew install go

brew tap go-swagger/go-swagger
brew install go-swagger

brew tap mongodb/brew
brew install mongodb-community@6.0
```

### Getting it running
- Run `make docs` to see the API definition.
- Import the postman collection to see the tests for the API.
- Start the mongo server `brew services start mongodb-community@6.0`
- Run `make start` to start the API.


# Code Map

- database:   handles db business logic
    - setup:    creates a connection pool with mongodb
- errors:     handles returning a request that has errored. Also contains the Wrap function that is used to help trace errors.
- models:     object definitions
- operations: handles requests
- router:     abstraction of echo route creation. Allows us to register routes programmatically instead of having a large route definition file that would need to be manually updated every time a route is added or changed.
- main.go:    configures and starts the server

