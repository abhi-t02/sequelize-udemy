import { ENUM, INTEGER, Model, STRING } from "sequelize";

import { sequelize } from "./index.model";

enum statusType {
  "ACTIVE",
  "INACTIVE",
}

export interface UserAttributes extends Model {
  id: number;
  username: string;
  email: string;
  password: string;
  status: statusType;
}

// define user model
const User = sequelize.define<UserAttributes>(
  "users",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    status: {
      type: ENUM("1", "0"),
      defaultValue: "1",
    },
  },
  {
    modelName: "User",
    timestamps: false,
  }
);

(async () => {
  await sequelize.sync();
})();

export default User;
