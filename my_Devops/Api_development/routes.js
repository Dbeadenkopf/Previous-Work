import express from "express";
import HorrorMovies from "./models/HorrorMovies.js";
const router = express.Router();

// mongo query to show horror movies
// using router async function

router.get("/HorrorMovies", async (req, res) => {
  const h_Movie = await db.HorrorMovies.find();
  res.send(h_Movie);
});

export default router;
