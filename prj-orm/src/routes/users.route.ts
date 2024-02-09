import { Router } from "express";
import { ENUM, INTEGER, Model, QueryTypes, STRING, Sequelize } from "sequelize";

import { User } from "../app.js";

const router = Router();

// Config
const DATABASE_NAME = <string>process.env.DATABASE_NAME;
const DATABASE_USERNAME = <string>process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = <string>process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then((value) => {
    console.log("DB Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

// Create some data to table
router.post("/", async (req, res) => {
  try {
    const { username, email, rollno, status } = req.body;

    const user = await User.create({
      username,
      email,
      rollno,
      status,
    });

    res.status(201).json(user);
  } catch (err: any) {
    // console.log(err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const users = await User.bulkCreate([
      {
        username: "user2",
        email: "some",
        rollno: 21,
        status: "1",
      },
    ]);
    res.status(201).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// update method
router.put("/:id", async (req, res) => {
  try {
    const { username } = req.body;
    await User.update(
      {
        username,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ message: "Update successfully." });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// delete api method
router.delete("/:id", async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json({ message: "User deleted successfully." });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// run raw query
router.get("/row", async (req, res) => {
  const users = await sequelize.query(`SELECT * from users;`, {
    type: QueryTypes.SELECT,
  });
  res.json(users);
});
export default router;
