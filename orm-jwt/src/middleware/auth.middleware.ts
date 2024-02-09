import { NextFunction, RequestHandler, Response } from "express";
import { verify } from "jsonwebtoken";
import { JwtType, RequestType } from "../types/types";

export default function authToken(
  req: RequestType,
  res: Response,
  next: NextFunction
): void {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token required.");
    }
    const token = req.headers.authorization;

    const { id } = <JwtType>verify(token, <string>process.env.JWT_SECRET);
    req.id = id;
    next();
  } catch (err) {
    next(err);
  }
}
