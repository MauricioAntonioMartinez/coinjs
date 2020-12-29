import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AddTransaction } from "../components/AddTransaction";
import { Modal } from "../components/Modal";
import { useStore } from "../store/context";
import "../styles/home.css";
interface Props {}

export const Home = (props: Props) => {
  const { state } = useStore();
  const [users, setUsers] = useState<{ username: string; balance: number }[]>(
    []
  );
  const [showModal, setShowModal] = useState(true);

  const fetchUsersHandler = async () => {
    const res = await axios.get("http://localhost:8080/users");
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsersHandler();
  }, []);

  if (!state.authenticated) return <Redirect to="/" />;

  return (
    <>
      <div className="grid-container">
        <Modal open={showModal} closeModal={() => setShowModal(!showModal)}>
          <AddTransaction
            success={() => {
              setShowModal(!showModal);
              fetchUsersHandler();
            }}
          />
        </Modal>
        <div className="transactions">
          <h2>- Transactions -</h2>
        </div>
        <div className="users">
          <h2>- Users -</h2>
          <ul>
            {users.map((user, key) => {
              return (
                <li key={key}>
                  {user?.username} - ${user.balance}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="logout">
          <button onClick={() => setShowModal(!showModal)}>Deposit</button>
          <button>WithDrawal</button>
        </div>
        <div className="balance">Current Balance ${state.balance}</div>
      </div>
    </>
  );
};
