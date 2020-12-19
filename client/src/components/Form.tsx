import React from "react";
import "../styles/form.css";
import "../styles/button.css";

interface Props {
  sendTo: string;
}

export const Form = ({ sendTo }: Props) => {
  const submit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div className="form" onSubmit={submit}>
      <input className="form-input" placeholder="username" />
      <input className="form-input" placeholder="password" />
      <button type="submit" className="btn fill">
        {sendTo}
      </button>
    </div>
  );
};
