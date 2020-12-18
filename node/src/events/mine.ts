import { Subjects } from "./subjects";

export interface MineEvent {
  subject: Subjects.Mine;
  data: {
    publisher: string;
    username: string;
    amount: number;
  };
}
