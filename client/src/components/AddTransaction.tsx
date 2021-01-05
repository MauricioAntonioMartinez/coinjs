import axios from "axios";
import React, { useState } from "react";
import { message } from "../helpers/message";
import { Actions, CHANGE_BALANCE } from "../store/actions";
import { useStore } from "../store/context";
interface Props {
  success: () => void;
  isDeposit?: boolean;
}

export const AddTransaction = ({ success, isDeposit }: Props) => {
  const [inputs, setInputs] = useState({ recipient: "", amount: 0 });
  const { dispatcher } = useStore();
  const makeTransactionHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await axios(
        `http://localhost:8080/${isDeposit ? "deposit" : "withdrawal"}`,
        {
          method: isDeposit ? "POST" : "PATCH",
          data: inputs,
          withCredentials: true,
        }
      );
      message.success(res.data.message);
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
      {isDeposit && (
        <input
          type="text"
          placeholder="recipient"
          className="form-input"
          value={inputs.recipient}
          onChange={(inp) =>
            setInputs((e) => ({ ...e, recipient: inp.target.value }))
          }
        />
      )}
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
        {isDeposit ? "Send" : "Withdrawal"}
      </button>
    </form>
  );
};
