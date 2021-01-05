import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { message } from "../helpers/message";
import { Actions, AUTHENTICATED } from "../store/actions";
import { useStore } from "../store/context";
import "../styles/button.css";
import "../styles/form.css";

interface Props {
  sendTo: string;
}

export const Form = ({ sendTo }: Props) => {
  const router = useHistory();
  const { dispatcher } = useStore();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/${sendTo}`,
        {
          ...inputs,
        },
        {
          withCredentials: true,
        }
      );
      message.success(res.data.message);

      dispatcher<AUTHENTICATED>({
        type: Actions.AUTHENTICATED,
        payload: {
          balance: res.data.balance,
          username: inputs.username,
        },
      });
      router.replace("/home");
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
