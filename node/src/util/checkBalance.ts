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
      const balance = nodeUser.data?.balance;
      nodeBalances[balance] = (nodeBalances[balance] || 0) + 1;
    } catch (e) {
      console.log(e.message);
    }
  }

  if (Object.entries(nodeBalances).length > 1)
    throw new Error("Waiting for sync");
};
