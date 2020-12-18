import { Subjects } from "./subjects";

export interface DepositEvent {
  subject: Subjects.Deposit;
  data: {
    recipient: string;
    sender: string;
    amount: number;
  };
}
