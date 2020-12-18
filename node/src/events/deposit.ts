import { Subjects } from "./subjects";

export interface DepositEvent {
  subject: Subjects.Deposit;
  data: {
    publisher: string;
    recipient: string;
    sender: string;
    amount: number;
  };
}
