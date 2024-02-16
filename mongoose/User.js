// this is our mongoose library
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1, // this makes our age to not have -#s
    max: 100,

    validate: {
      validator: (v) => v % 2 == 0, // checks if number is even
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    // when we put immutable here it prevents change from happening
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User", // referencing the user model
  },
  hobbies: [String],
  address: addressSchema,
});

// this is a method that will run for every instance of
// our schema, cannot use arrow function cause it will be referenced
userSchema.methods.sayHi = function () {
  console.log(`Hi. My name is ${this.name}`);
};

// now to do a static method
// this we just want it to be a return query
userSchema.statics.findByName = function (name) {
  // return a where query
  return this.find({ name: new RegExp(name, "i") });
};

// if you want to do a particular Query , this
// is the query we use to do more complex stuff
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// now to have a virtual method which must have a value to
// pass inside, virtual is a property that is not on
// the actual schema, now we have a named email property
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// now lets learn our middleware which is save, validate,
// and remove very important
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next(); // go onto the next code
});

// now we will run middleware after the save
userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next(); // go onto the next code
});

// now we need to make a model for this schema
// we passed in the schema we made
module.exports = mongoose.model("User", userSchema);
