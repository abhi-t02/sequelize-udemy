const express = require("express");

const Email = require("./models").Email;
const User = require("./models").User;
const Post = require("./models").Post;
const Comment = require("./models").Comment;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Email,
      },
    });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

app.get("/emails", async (req, res) => {
  const emails = await Email.findAll({
    include: User,
  });
  res.send(emails);
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: Comment,
    });
    res.send(posts);
  } catch (err) {
    console.log(err);
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: Post,
        attributes: ["name"],
      },
      attributes: ["comment_text", "Post.name"],
    });

    res.send(comments);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server is listening..");
});
