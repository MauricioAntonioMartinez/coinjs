import { BROTHER_NODES, NODE_NAME, TOTAL_NODES } from "../constants";
import axios from "axios";
import { UserDocument } from "../model/User";

/*
    UserBalances {
        node1 80
        node2 80
        node3 50 <== we are in this one
        node4 60
        node5 80
    }
*/

export const checkBalance = async (user: UserDocument) => {
  const nodeBalances: { [balance: string]: number } = {};
  nodeBalances[user.balance] = 1;

  for (const node of BROTHER_NODES) {
    if (node === NODE_NAME) continue;
    try {
      const nodeUser = await axios.get(
        `http://${node}:6000/user/${user.username}`
      );
      const balance = nodeUser.data.balance;
      nodeBalances[balance] = (nodeBalances[balance] || 0) + 1;
    } catch (e) {
      console.log(e.message);
    }
  }

  const sortedBalances = Object.entries(nodeBalances).sort(
    (prev, next) => prev[1] - next[1]
  );

  const appearance = +sortedBalances[0][1];
  const balance = +sortedBalances[0][0];
  console.log(
    `PERCENTAGE OF VALIDATION ${((appearance / TOTAL_NODES) * 100).toFixed(2)}%`
  );

  return { validBalance: balance === +user.balance, consensusBalance: balance };
};
