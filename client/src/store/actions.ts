export enum Actions {
  CHANGE_BALANCE,
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

export interface CHANGE_BALANCE {
  type: Actions.CHANGE_BALANCE;
  payload: {
    balance: number;
  };
}
