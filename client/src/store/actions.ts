export enum Actions {
  CHANGE_BALANCE,
  AUTHENTICATED,
  LOGOUT,
}

export interface Action {
  type: Actions;
  payload?: any;
}

export interface LOGOUT {
  type: Actions.LOGOUT;
  payload: null;
}

export interface AUTHENTICATED {
  type: Actions.AUTHENTICATED;
  payload: {
    balance: number;
    username: string;
  };
}

export interface CHANGE_BALANCE {
  type: Actions.CHANGE_BALANCE;
  payload: {
    balance: number;
  };
}
