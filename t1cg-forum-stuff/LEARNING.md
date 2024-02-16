# Start by completing the [Go Tour](https://go.dev/tour/welcome/1)

# Some topics that show up in the code base

### Errors
One of the first things you will notice is that most functions return errors. This means when you call a function, you will almost always have to handle an error as well. The following will begin to seem very familiar.
```
	if err != nil {
		return user, errors.Wrap(err)
	}
```

This may seem frustrating or tedious, but it is an extremely important part of writing Go as it makes the code much more reliable and much easier to debug when something does go wrong. 

### Pointers
https://gobyexample.com/pointers

Currently they show up most often when decoding or binding a struct, as in 
```
	err = coll.FindOne(context.TODO(), filter).Decode(&user)
```
but they will be extremely important moving forward. Pointers are very useful but also the source of a lot of hard to catch bugs, so spend some time reviewing this topic.

### Interfaces
https://gobyexample.com/interfaces

In `database/setup.go` there is an interface that implements database functionality

### Blank import

E.g. `_ "github.com/t1cg/t1cg-forum/operations"` in `main.go` 

Calls the `init()` functions when imported, even though `main.go` doesn't use the functions in the package. In this case it registers all the routes with the router, but it can also be used to establish connections with other services, load data, etc.

### Defer
https://gobyexample.com/defer

In `main.go` I create a connection to the database by calling 
```
	err := database.Start()
```
and then immediately call
```
	defer database.Close()
```

This ensures that whenever the server is stopped, the connection is also cleaned up.

# PS
If you are really interested in getting experience with Go, I recommend [this course](https://www.oreilly.com/library/view/ultimate-go-programming/9780135261651/). 