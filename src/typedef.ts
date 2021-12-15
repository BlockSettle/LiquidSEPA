import { Action as ReduxAction } from 'redux';


/*
 * Redux
 */

export interface EmptyAction<T> extends ReduxAction<T> {}
export interface Action<T, P> extends ReduxAction<T> { payload: P }
export interface FailureAction<T> extends ReduxAction<T> { error: string }


/*
 * Environment
 */

export enum Environment {
  DEV = 'dev',
  LIVE = 'live'
}


/*
 * Auth WS API
 */

export enum AuthSocketEndpoint {
  REGISTER = 'signup_init',
  REGISTER_STATUS = 'signup_status',

  LOG_IN = 'login_init',
  LOG_IN_STATUS = 'sign_status',

  REFRESH_SESSION = 'renew'
}

export type AuthSocketReq<M = AuthSocketEndpoint, A = {}> = {
  method: M;
  args: A;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};

export type AuthSocketRes<M = AuthSocketEndpoint, D = {}> = {
  method: M;
  error: null | number | string;
  data: D;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};


/*
 * Main WS API
 */

export enum SocketEndpoint {
  AUTHORIZE = 'authorize',

  VALIDATE_ADDRESS = 'validate_payout_address',
  WHITELIST_ADDRESS = 'new_payout_account',
  
  CREATE_BANK_ACCOUNT = 'add_iban_account',

  GET_ACCOUNTS = 'currency_accounts',

  RFQ_SELL = 'sell',
  RFQ_BUY = 'buy',
  CONFIRM_RFQ = 'confirm',
  RFQ_STATUS = 'status',
}

export type SocketReq<M = SocketEndpoint, A = {}> = {
  method: M;
  args: A;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};

export type SocketRes<M = SocketEndpoint, D = {}> = {
  method: M;
  error: null | number | string;
  data: D;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};


/*
 * Auth eID
 */

export enum AuthEidStatus {
  // Waiting for sign via mobile app:
  WAITING_FOR_SIGNATURE = 'NOT_READY',

  // Success:
  SUCCESS = 'SUCCESS',

  // Auth eID errors:
  TIMEOUT = 'TIMEOUT',
  CANCELLED = 'USER_CANCELLED',
  REQUEST_CANCELLED = 'PR_CANCELLED',
  ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED',

  // API errors:
  REQUEST_ERROR = 'REQUEST_ERROR',
}


/*
 * Accounts
 */

export enum AccountType {
  WALLET = 'Wallet',
  BANK = 'Bank'
}

export type AccountDetails = {
  bankId: string;
  bankName: string;
};

export type Account<T = AccountType> = {
  type: T;
  name: string;
  acctNum: string;
  ref: null | string;
  account_details?: AccountDetails;
};


/*
 * Addresses
 */

export type Address = Account<AccountType.WALLET>;


/*
 * Bank Accounts
 */

export type BankAccount = Account<AccountType.BANK>;


/*
 * Currencies
 */

export enum Currency {
  EURX = 'EURx',
  USDT = 'USDt',
  EUR = 'EUR'
}

export enum StableCurrency {
  EURX = 'EURx',
  USDT = 'USDt'
}


/*
 * Rfq
 */

export enum RfqDirection {
  BUY = 'buy',
  SELL = 'sell'
}

export type RfqStatus = string;

export type RfqData = {
  direction: RfqDirection;
  confirm: boolean;
  payoutAmount: string;
  payoutAccountOwner: null | string;
  rfqId: string;
  status: RfqStatus;
  depositAmount: string;
  created: string;
  txId: string;
  settled: string;
  payoutIban: null | string;
  matched: boolean,
  depositAddress: null | string;
  depositorName: string;
  depositorIban: string;
  payoutAddress: string;
};


/*
 * Status modal
 */

export enum StatusModalType {
  SUCCESS = 'Success',
  PROCESSING = 'Processing',
  ERROR = 'Error'
}


/*
 * Alert
 */

export type Alert = {
  type: StatusModalType;
  message: string;
  button?: string;
  onButtonPress?: () => void;
};