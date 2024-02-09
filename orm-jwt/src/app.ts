import express, { NextFunction, Request, Response } from "express";

import { sequelize } from "./models/index.model";
import userRouter from "./routes/user.route";
import { errorType } from "./types/types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

// error handler route
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err as errorType) {
    res
      .status((<errorType>err).status || 500)
      .json({ error: (<errorType>err).message });
  }
  next();
});

sequelize.sync();
export default app;
