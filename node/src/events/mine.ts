import { Subjects } from "./subjects";

export interface MineEvent {
  subject: Subjects.Mine;
  data: {
    username: string;
    amount: number;
  };
}
