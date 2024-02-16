import mongoose from "mongoose";

import app from "./index.js";

// Mongo and api are containerized inside of the same docker network.  Since this
// api is in the same network as mongo, you can use the mongo container name (mongo)
// as the host in the connection string below.  To connect to mongo from outside of docker
// container, use localhost for host.  Mongo is started inside of container on port
// 27017 and it is mapped to port 27031 on the host machine.  So, to connect to mongo from inside
// of the container network, as we do here, you use port 27017. To connect to mongo
// from host machine outside of the container network, use 27031.
// - connection url from inside container => mongodb://mongo:27017/movies
// - connection url from outside container => mongodb://localhost:27031
mongoose
  .connect("mongodb://mongo:27017/movies", {
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));
mongoose.connection.once("connected", () =>
  console.log("\x1b[36mmovie app connected to mongo\x1b[0m")
);
mongoose.connection.on("error", (err) => console.log(err));

const port = 8081;
app.listen(port, () => {
  console.log(`Movie app listening on port ${port}`);
});
