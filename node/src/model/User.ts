import mongoose, { SchemaType } from "mongoose";
import argon2 from "argon2";

interface UserAttrs {
  username: string;
  password: string;
}

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  balance: string;
  comparePasswords(password: string): Promise<boolean>;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 100, // you initiate your account with 100 box, to be available to transfer
  },
});

schema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  // @ts-ignore
  const hashPassword = await argon2.hash(this.password);
  // @ts-ignore
  this.password = hashPassword;
  next();
});

schema.method("comparePasswords", function (password: string) {
  // @ts-ignore
  return argon2.verify(this.password, password);
});

schema.static("build", function (attr: UserAttrs) {
  return new User(attr);
});

export const User = mongoose.model<UserDocument, UserModel>("User", schema);
