import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserDocument } from "../model/User";
import { checkBalance } from "../util/checkBalance";

const SECRET_KEY = process.env.SECRET_KEY;

interface UserPayload {
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserDocument;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  try {
    const userPayload = jwt.verify(token, SECRET_KEY!) as UserPayload;
    const user = await User.findOne({
      username: userPayload.username,
    });
    if (!user) throw new Error("Username not found.");
    req.user = user;
  } catch (e) {}
  if (req.user) await checkBalance(req.user);
  next();
};
