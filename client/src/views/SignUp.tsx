import React from "react";
import { Form } from "../components/Form";

interface Props {}

export const SignUp = (props: Props) => {
  return <Form sendTo="signup" />;
};
