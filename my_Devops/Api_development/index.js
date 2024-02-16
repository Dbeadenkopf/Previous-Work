import express from "express";

import { json } from "express";

import cors from "cors";

import routes from "./routes.js";

const app = express();

// defining middleware
app.use(cors()); // accessomg corse rules
app.use(json()); // using info from json

// using routes
app.use("/api", routes);

export default app;
