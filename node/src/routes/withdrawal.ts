import express from "express";

export const withDrawalRouter = express.Router();

withDrawalRouter.post("/create-withDrawal", (req, res, next) => {
  return res.status(200).json({
    success: true,
  });
});
