import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validateUser } from "../common/validateBalance";
import { User, UserDocument } from "../model/User";

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
    req.user = await validateUser(user);
  } catch (e) {}

  next();
};
