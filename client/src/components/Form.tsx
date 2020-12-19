import React, { useState } from "react";
import axios from "axios";
import "../styles/form.css";
import "../styles/button.css";

import { message } from "../helpers/message";
import { useHistory } from "react-router";

interface Props {
  sendTo: string;
}

export const Form = ({ sendTo }: Props) => {
  const router = useHistory();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/${sendTo}`, inputs);
      message.success(res.data.message);
      router.push("/home");
    } catch (e) {
      message.error(e.response?.data?.message);
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <input
        value={inputs.username}
        onChange={(e) =>
          setInputs((prev) => {
            return { ...prev, username: e.target.value };
          })
        }
        id="username"
        className="form-input"
        placeholder="username"
      />
      <input
        onChange={(e) =>
          setInputs((prev) => {
            return { ...prev, password: e.target.value };
          })
        }
        id="password"
        className="form-input"
        placeholder="password"
        type="password"
        value={inputs.password}
      />
      <button type="submit" className="btn fill">
        {sendTo}
      </button>
    </form>
  );
};
