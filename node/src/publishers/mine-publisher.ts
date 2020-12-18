import { MineEvent } from "../events/mine";
import { Subjects } from "../events/subjects";
import { Publisher } from "../model/Publisher";

export class MinePublisher extends Publisher<MineEvent> {
  readonly subject = Subjects.Mine;
}
