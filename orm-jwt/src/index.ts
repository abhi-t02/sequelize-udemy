import app from "./app";
import { sequelize } from "./models/index.model";

sequelize
  .authenticate()
  .then((value) => {
    console.log("DB Connected..");
    app.listen(process.env.PORT, () => {
      console.log("Server is listening..");
    });
  })
  .catch((err) => {
    console.log(err);
  });
