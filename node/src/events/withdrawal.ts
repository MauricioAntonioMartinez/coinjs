import { Subjects } from "./subjects";

export interface WithDrawalEvent {
  subject: Subjects.WithDrawal;
  data: {
    userId: string;
    amount: number;
  };
}
