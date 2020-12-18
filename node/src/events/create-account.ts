import { Subjects } from "./subjects";

export interface CreateAccountEvent {
  subject: Subjects.CreateAccount;
  data: {
    username: string;
    password: string;
  };
}
