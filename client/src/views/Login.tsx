import React from "react";
import { Form } from "../components/Form";

interface Props {}

export const Login = (props: Props) => {
  return <Form sendTo="login" />;
};
