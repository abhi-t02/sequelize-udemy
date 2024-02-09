import express from "express";
import cors from "cors";
import logger from "morgan";
import { ENUM, INTEGER, Model, STRING, Sequelize } from "sequelize";

import userRouter from "./routes/users.route.js";

const app = express();

// Config
const DATABASE_NAME = <string>process.env.DATABASE_NAME;
const DATABASE_USERNAME = <string>process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = <string>process.env.DATABASE_PASSWORD;

// connecting to database
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

// define model in sequelize
const User = sequelize.define(
  "users",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      unique: true,
    },
    rollno: {
      type: INTEGER,
    },
    status: {
      type: ENUM("1", "0"),
      defaultValue: "1",
    },
  },
  {
    // timestamps: true,
    modelName: "User",
  }
);

class Book extends Model {}
Book.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    amount: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: ENUM("1", "0"),
      defaultValue: "1",
    },
  },
  {
    sequelize,
    tableName: "Books",
  }
);

// sync the model
sequelize.sync();

// middleware config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// routes
app.use("/api/users", userRouter);

export { User, Book };
export default app;
