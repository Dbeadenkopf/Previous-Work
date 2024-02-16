// file for grabbing schema data
// also modeling calling using mongoose
import mongoose from "mongoose";

// creating mongoose schema, to match
// data being pulled from mongo
const schema = mongoose.Schema({
  title: String,
  year: String,
});
// creating model
const horrorModel = mongoose.model("HorrorMovies", schema, "HorrorMovies");
export default horrorModel;
