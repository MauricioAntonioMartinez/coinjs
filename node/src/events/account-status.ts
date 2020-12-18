import { Subjects } from "./subjects";

export interface AccountStatusEvent {
  subject: Subjects.AccountStatus;
  data: {
    userId: string;
    balance: number;
  };
}
