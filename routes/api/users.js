const express = require("express");
const users = require("../../users");
//const uuid=require('uuid')
const router = express.Router();
const Post = require("../../models/posts");
const { RegistrValidate } = require("../../validationData"); // joi is to validate date coming from user

router.get("/", async (req, res) => {
  //validate Data
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ msg: err });
  }
});

//get a specific user
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id, (err) => {
      if (err) res.status(400).json({ msg: "invalid id" });
    });
    res.json(posts);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.post("/", async (req, res) => {
  const user = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const saveposts = await user.save();
    res.json(saveposts);
  } catch (err) {
    res.json({ msg: err });
  }
});

//update the user
router.patch("/:id", async (req, res) => {
  //  validation
  const { error } = RegistrValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if id is available
  const posts = await Post.findById(req.params.id, (err) => {
    if (err) res.status(400).json({ msg: "invalid id" });
  });
  try {
    var user = await Post.findById(req.params.id);
    console.log(user);
    await Post.update(
      { _id: req.params.id },
      {
        $set: {
          title: `${req.body.title ? req.body.title : user.title}`,
          description: `${
            req.body.description ? req.body.description : user.description
          }`,
        },
      }
    );
    const newuser = await Post.findById(req.params.id);
    res.json(newuser);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
