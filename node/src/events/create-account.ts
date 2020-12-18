import { Subjects } from "./subjects";

export interface CreateAccountEvent {
  subject: Subjects.CreateAccount;
  data: {
    publisher: string;
    username: string;
    password: string;
  };
}
