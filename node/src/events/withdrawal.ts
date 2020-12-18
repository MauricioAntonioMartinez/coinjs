import { Subjects } from "./subjects";

export interface WithDrawalEvent {
  subject: Subjects.WithDrawal;
  data: {
    publisher: string;
    user: string;
    amount: number;
  };
}
