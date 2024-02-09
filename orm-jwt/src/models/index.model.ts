import { Sequelize } from "sequelize";

// DB connection
const sequelize = new Sequelize(
  <string>process.env.DB_NAME,
  <string>process.env.DB_USERNAME,
  <string>process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  }
);

const db = {};

export { sequelize };
