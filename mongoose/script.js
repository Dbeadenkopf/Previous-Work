const mongoose = require("mongoose");

const User = require("./User.js");

// this is the line of code to connect to our database
mongoose.connect("mongodb://localhost/HorrorDB");

run();
async function run() {
  try {
    // below works the same as mongodb
    const user = await User.findOne({ name: "Kyle", email: "test@test.com" });
    console.log(user);
    user.sayHi();
    await user.save();
    console.log(user);
    console.log(user.namedEmail);
  } catch (e) {
    console.log(e.message);
  }
}

/*async function run() {  
    User.findById().save()
  try {
    const user = await User.create({
      name: "Kyle",
      age: 23,
      email: "TEST@test.com",
      hobbies: ["Weight Lifting", "Bowling"],
      address: {
        street: String,
        city: String,
      },
    });
    user.createdAt = 5;
    await user.save();
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}*/
