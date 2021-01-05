import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AddTransaction } from "../components/AddTransaction";
import { Modal } from "../components/Modal";
import { message } from "../helpers/message";
import { Actions, CHANGE_BALANCE, LOGOUT } from "../store/actions";
import { useStore } from "../store/context";
import "../styles/header.css";
import "../styles/home.css";
interface Props {}

export const Home = (props: Props) => {
  const { state } = useStore();
  const [users, setUsers] = useState<{ username: string; balance: number }[]>(
    []
  );
  const [modalState, setModalState] = useState({
    open: false,
    isDeposit: false,
  });

  const fetchUsersHandler = async () => {
    const res = await axios.get("http://localhost:8080/users");
    console.log(res.data);
    setUsers(res.data);
  };
  const { dispatcher } = useStore();
  const history = useHistory();
  const logoutHandler = () => {
    dispatcher<LOGOUT>({ type: Actions.LOGOUT, payload: null });
    history.push("/");
  };

  const mineHandler = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8080/mine",
        {},
        { withCredentials: true }
      );
      message.success(res.data.message);
      dispatcher<CHANGE_BALANCE>({
        type: Actions.CHANGE_BALANCE,
        payload: { balance: res.data.balance },
      });
    } catch (e) {
      message.error(e?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsersHandler();
  }, []);

  if (!state.authenticated) return <Redirect to="/" />;

  return (
    <>
      <Modal
        open={modalState.open}
        closeModal={() =>
          setModalState((prev) => ({ isDeposit: true, open: !prev.open }))
        }
      >
        <AddTransaction
          isDeposit={modalState.isDeposit}
          success={() => {
            setModalState((prev) => ({ isDeposit: true, open: !prev.open }));
            fetchUsersHandler();
          }}
        />
      </Modal>

      <div className="grid-container">
        <div className="actions">
          <button
            className="btn fill"
            onClick={() =>
              setModalState((prev) => ({ isDeposit: true, open: !prev.open }))
            }
          >
            Deposit
          </button>
          <button
            className="btn fill"
            onClick={() =>
              setModalState((prev) => ({ isDeposit: false, open: !prev.open }))
            }
          >
            WithDrawal
          </button>
          <button className="btn outline" onClick={mineHandler}>
            Mine
          </button>
        </div>
        <div className="balance header">
          <h1 style={{ fontSize: "2rem" }}>
            Current Balance of {state.username}: ${state.balance}
          </h1>
        </div>
        <div className="logout">
          <button className="btn outline" onClick={logoutHandler}>
            LogOut
          </button>
        </div>
        <div className="transactions">
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
      </div>
    </>
  );
};
