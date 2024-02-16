// const express = require('express');
import express from "express";
import movies from "./models/movies";
const router = express.Router();

// Get all movies
router
  .get("/movies", async (req, res) => {
    try {
      const hm = await movies.find();
      res.send(hm);
    } catch {
      res.status(404).send({ error: "Cannot Find Movies!" });
    }
  })
  // Post a movie
  .post("/movies/post", async (req, res) => {
    try {
      const result = await movies.insertMany({
        title: req.body.title,
        release_date: req.body.release_date,
        overview: req.body.overview,
      });

      res.send(result);
    } catch {
      res.status(404).send({ error: "Failed to post Movie!" });
    }
  });

export default router;
