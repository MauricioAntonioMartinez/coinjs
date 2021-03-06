import { UserDocument } from "../model/User";

export const makeTransaction = async ({
  amount,
  recipient,
  sender,
}: {
  recipient?: UserDocument;
  sender: UserDocument;
  amount: number;
}): Promise<number> => {
  const nextUserBalance = +sender.balance - +amount;
  if (nextUserBalance < 0 && recipient)
    throw new Error("Insufficient balance for the transaction.");

  const userUpdated = await sender
    .set({ balance: recipient ? nextUserBalance : +sender.balance + +amount })
    .save();
  if (recipient)
    await recipient.set({ balance: +recipient.balance + +amount }).save();
  return +userUpdated.balance;
};
