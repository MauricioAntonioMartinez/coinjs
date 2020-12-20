import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../store/context";
import "../styles/home.css";
import { Redirect } from "react-router-dom";
interface Props {}

export const Home = (props: Props) => {
  const { state } = useStore();
  const [users, setUsers] = useState<{ username: string }[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8080/users");
      console.log(res.data);
      setUsers(res.data);
    })();
  }, []);

  if (!state.authenticated) return <Redirect to="/" />;

  return (
    <div className="grid-container">
      <div className="transactions">
        <h2>- Transactions -</h2>
      </div>
      <div className="users">
        <h2>- Users -</h2>
        <ul>
          {users.map((user, key) => {
            return <li key={key}>{user?.username}</li>;
          })}
        </ul>
      </div>
      <div className="logout">
        <button>Deposit</button>
        <button>WithDrawal</button>
      </div>
      <div className="balance">Current Balance ${state.balance}</div>
    </div>
  );
};
