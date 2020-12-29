import axios from "axios";
import React, { useState } from "react";
import { message } from "../helpers/message";
import { Actions, CHANGE_BALANCE } from "../store/actions";
import { useStore } from "../store/context";
interface Props {
  success: () => void;
}

export const AddTransaction = ({ success }: Props) => {
  const [inputs, setInputs] = useState({ recipient: "", amount: 0 });
  const { dispatcher } = useStore();
  const makeTransactionHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/deposit", inputs, {
        withCredentials: true,
      });
      message.success("Transaction succeeded");
      console.log(res.data);
      dispatcher<CHANGE_BALANCE>({
        type: Actions.CHANGE_BALANCE,
        payload: {
          balance: res.data.balance,
        },
      });
      success();
    } catch (e) {
      console.log(e.data);
      message.success("Failed");
    }
  };

  return (
    <form className="form" onSubmit={makeTransactionHandler}>
      <input
        type="text"
        placeholder="recipient"
        className="form-input"
        value={inputs.recipient}
        onChange={(inp) =>
          setInputs((e) => ({ ...e, recipient: inp.target.value }))
        }
      />
      <input
        type="number"
        placeholder="amount"
        className="form-input"
        value={inputs.amount}
        onChange={(inp) =>
          setInputs((e) => ({ ...e, amount: +inp.target.value }))
        }
      />
      <button type="submit" className="btn fill">
        Send
      </button>
    </form>
  );
};
