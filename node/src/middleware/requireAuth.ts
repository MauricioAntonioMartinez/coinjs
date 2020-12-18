import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUser = req.user;

  if (!currentUser) {
    return res.status(401).json({
      message: "Not allowed",
    });
  }

  next();
};
