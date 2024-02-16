import cors from "cors";

import express from "express";

import { json } from "express";

import routes from "./routes.js";

const app = express();

// middleware
app.use(cors());
app.use(json());

// routes
app.use("/api", routes);

export default app;
