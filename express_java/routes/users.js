const express = require("express");
const { reset } = require("nodemon");

// now lets create a router that
// acts as a mini app
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User List");
});

// lets make a another router, generates
// and list out all the new users
router.get(`/new`, (req, res) => {
  res.send("User New Form");
});

router.post("/", (req, res) => {
  res.send("Create User");
});

// we can chain in all of our request here
router
  .route("/:id")
  .get("/:id", (req, res) => {
    req.params.id;
    res.send(`Get User With ID ${req.params.id}`);
  })
  .put("/:id", (req, res) => {
    req.params.id;
    res.send(`Update User With ID ${req.params.id}`);
  })
  .delete("/:id", (req, res) => {
    req.params.id;
    res.send(`Delete User With ID ${req.params.id}`);
  });

router.param("id", (req, res, next, id) => {
  console.log(id);
});
// now to use the router, just export
module.exports = router;
