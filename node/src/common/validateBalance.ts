import { UserDocument } from "../model/User";
import { checkBalance } from "./checkBalance";

export const validateUser = async (user: UserDocument) => {
  let validatedUser = user;
  const { consensusBalance, validBalance } = await checkBalance(user);
  if (!validBalance) {
    validatedUser = await user.set({ balance: consensusBalance }).save();
  }
  return validatedUser;
};
