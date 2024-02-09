import { Request } from "express";

export interface errorType extends Error {
  message: string;
  status: number;
}

export interface JwtType extends JwtPayload {
  id: number;
}

export interface RequestType extends Request {
  id?: number;
}
