import { Subjects } from "../events/subjects";
import { WithDrawalEvent } from "../events/withdrawal";
import { Publisher } from "../model/Publisher";

export class WithDrawalPublisher extends Publisher<WithDrawalEvent> {
  readonly subject = Subjects.WithDrawal;
}
