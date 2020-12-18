import { DepositEvent } from "../events/deposit";
import { Subjects } from "../events/subjects";
import { Publisher } from "../model/Publisher";

export class DepositPublisher extends Publisher<DepositEvent> {
  readonly subject = Subjects.Deposit;
}
