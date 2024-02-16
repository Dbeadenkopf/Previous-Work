import mongoose from "mongoose";

import app from "./index.js";

// password to access mongo db
const p_Word = "TheFlock#08";

// establishing mongo connection
mongoose
  .connect(
    `mongodb://daveAdmin:${encodeURIComponent(
      p_Word
    )}@172.31.14.12:27017/horrorDB?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => console.log(err));
mongoose.connection.once("connected", () =>
  console.log(`\x1b[36mHorrorMovie app connected to mongo\x1b[0m`)
);
mongoose.connection.on("error", (err) => console.log(err));

// connecting to port
const port = 8082;
app.listen(port, () => {
  console.log(`HorrorMovie app listening on port ${port}`);
});
