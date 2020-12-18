import { CreateAccountEvent } from "../events/create-account";
import { Subjects } from "../events/subjects";
import { Publisher } from "../model/Publisher";

export class CreateAccountPublisher extends Publisher<CreateAccountEvent> {
  readonly subject = Subjects.CreateAccount;
}
