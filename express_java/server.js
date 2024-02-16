// this file will contain all of our server code

// lets create our express library
const express = require("express");

// create app variable
const app = express();

// now lets setup our view engine
app.set("view engine", "ejs");

// lets make a get
// we made a "/" route
app.get("/", (req, res) => {
  console.log("Here");
  // lets render a file
  res.render("index", { text: "World" });
});

// lets import our router
const userRouter = require("./routes/users");

// now lets create our path
// we will mount /users router
// this allows our router to link up
app.use("/users", userRouter);

// now install our app on a port
app.listen(3000);
