package main

// to use servers need to import net
import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// our json data holder struct
type horror_movie struct {
	ID          string `json:"id"`
	Item        string `json:"title"`
	HaveWatched bool   `json:"completed"`
}

// The client and the server need something to communicate
// with and so we use horror movies, we need
// client json -> server -> data
var horror_movies = []horror_movie{
	{ID: "1", Item: "Halloween", HaveWatched: false},
	{ID: "2", Item: "Lord of the Flies", HaveWatched: false},
	{ID: "3", Item: "They Live", HaveWatched: false},
}

// this function will return
// upcoming information per HTTP request
func getHorrorMovies(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, horror_movies)
}

func main() {
	router := gin.Default()
	router.GET("/horror_movies", getHorrorMovies)
	router.Run("localhost:9090")
}
