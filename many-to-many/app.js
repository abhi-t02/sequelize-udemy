const express = require("express");

const User = require("./models").User;
const Role = require("./models").Role;
const UserRole = require("./models").UserRole;

const app = express();

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        througth: {
          model: UserRole,
        },
        attributes: ["name"],
      },
      attributes: ["id", "name", "email"],
    });
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("server is listening..");
});
