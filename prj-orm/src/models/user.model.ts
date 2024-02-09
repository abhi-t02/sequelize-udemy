import { ENUM, INTEGER, Model, STRING, Sequelize } from "sequelize";
import { sequelize } from "../app.js";

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

export default User;
