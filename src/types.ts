import Amount from "@/utils/Amount";

export type ApiActivity = {
  id: string;
  type: "admin" | "user";
  message: string;
  created_at: string;
};

export type Activity = {
  id: string;
  type: "admin" | "user";
  message: string;
  createdAt: Date;
};

export type ApiActivityResponse = {
  activities: ApiActivity[];
  status: "success" | "error";
};

export type Currency = {
  name: string;
  symbol: Asset;
  decimals: number;
  ledgerID: Ledger;
};

export type Asset =
  | "ADA"
  | "AVAX"
  | "BAT"
  | "BNB"
  | "BTC"
  | "DAI"
  | "DOT"
  | "ETH"
  | "HBAR"
  | "LINK"
  | "MATIC"
  | "SOL"
  | "TRX"
  | "UNI"
  | "USDT"
  | "USDC"
  | "XRP";

export enum Ledger {
  Ada = 1,
  Avalanche,
  BasicAttentionToken,
  Binance,
  Bitcoin,
  DAI,
  Dot,
  Ether,
  Hedera,
  Link,
  Matic,
  Solana,
  Tron,
  Uniswap,
  USDT,
  USDC,
  XRP,
}

const decimals = 18;

export const allCurrencies: Record<Asset, Currency> = {
  ADA: { name: "Cardano", symbol: "ADA", decimals, ledgerID: Ledger.Ada },
  AVAX: {
    name: "AVAX",
    symbol: "AVAX",
    decimals,
    ledgerID: Ledger.Avalanche,
  },
  BAT: {
    name: "Basic Attention Token",
    symbol: "BAT",
    decimals,
    ledgerID: Ledger.BasicAttentionToken,
  },
  BNB: { name: "BNB", symbol: "BNB", decimals, ledgerID: Ledger.Binance },
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    ledgerID: Ledger.Bitcoin,
  },
  DAI: { name: "DAI", symbol: "DAI", decimals: 18, ledgerID: Ledger.DAI },
  DOT: { name: "Polkadot", symbol: "DOT", decimals: 10, ledgerID: Ledger.Dot },
  ETH: { name: "Ether", symbol: "ETH", decimals, ledgerID: Ledger.Ether },
  HBAR: {
    name: "Hedera HBARs",
    symbol: "HBAR",
    decimals: 8,
    ledgerID: Ledger.Hedera,
  },
  LINK: { name: "LINK", symbol: "LINK", decimals: 24, ledgerID: Ledger.Link },
  MATIC: {
    name: "MATIC",
    symbol: "MATIC",
    decimals,
    ledgerID: Ledger.Matic,
  },
  SOL: { name: "Solana", symbol: "SOL", decimals: 9, ledgerID: Ledger.Solana },
  TRX: { name: "TRX", symbol: "TRX", decimals: 6, ledgerID: Ledger.Tron },
  UNI: {
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    ledgerID: Ledger.Uniswap,
  },
  USDT: { name: "USDT", symbol: "USDT", decimals: 6, ledgerID: Ledger.USDT },
  USDC: { name: "USDC", symbol: "USDC", decimals: 6, ledgerID: Ledger.USDC },
  XRP: { name: "Ripple", symbol: "XRP", decimals: 6, ledgerID: Ledger.XRP },
};

export enum AccountType {
  Wallet = 1,
  FundImmediate,
  FundMonth,
  Fund3Months,
  Fund6Months,
  FundOneYear,
}

export type ApiBalance = {
  id: string;
  ledger: Ledger;
  currency: Asset;
  code: AccountType;
  balance: string;
  balance_usd: number;
  balance_pending: string;
  balance_pending_usd: number;
  timestamp: number;
};

export type ApiBalanceResponse = {
  accounts: ApiBalance[];
  status: "success" | "error";
};

export type ApiFundBalanceResponse = {
  fund_accounts: ApiBalance[];
  status: "success" | "error";
};

export type Balance = {
  id: number;
  ledger: Ledger;
  code: AccountType;
  balance: Amount;
  balancePending: Amount;
  createdAt: Date;
};

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type ApiUserResponse = {
  user: ApiUser;
  status: "success" | "error";
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type ApiSetting = {
  type: "user" | "admin";
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  value: string;
};

export type Setting = {
  type: "user" | "admin";
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  value: string;
};

export type ApiSettingsResponse = {
  settings: ApiSetting[];
  status: "success" | "error";
};

export type ApiPrice = {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  currency: Asset;
  is_current: boolean;
  period: number;
  rate: number;
  change_24h: number;
};

export type Price = {
  id: number;
  updatedAt: Date;
  currency: Asset;
  rate: number;
  change24h: number;
};

export type ApiPricesResponse = {
  prices: ApiPrice[];
  status: "success" | "error";
};

export type ApiTransaction = {
  id: string;
  amount: string;
  amount_usd: number;
  address?: string;
  currency: Asset;
  code: TransactionType;
  timestamp: number;
  debit_account_id?: number;
  credit_account_id?: number;
};

export enum TransactionType {
  Deposit = 1,
  Withdraw,
  SwapFrom,
  SwapTo,
  Subscribe,
  Interest,
  Redeem,
}

export const transactionTypeStrings: Record<TransactionType, string> = {
  [TransactionType.Deposit]: "Deposit",
  [TransactionType.Withdraw]: "Withdrawal",
  [TransactionType.SwapFrom]: "Swap From",
  [TransactionType.SwapTo]: "Swap To",
  [TransactionType.Subscribe]: "Subscription",
  [TransactionType.Interest]: "Interest",
  [TransactionType.Redeem]: "Redemption",
};

export type TransactionTypeString =
  (typeof transactionTypeStrings)[TransactionType];

export type Transaction = {
  id: string;
  amount: Amount;
  code: TransactionType;
  address?: string;
  transactionType: TransactionTypeString;
  timestamp: Date;
  debitAccountId?: number;
  creditAccountId?: number;
};

export type ApiTransactionsResponse = {
  transactions: ApiTransaction[];
  status: "success" | "error";
};

export type ApiSwap = {
  id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  from_amount: string;
  to_amount: string;
  from_currency: Asset;
  to_currency: Asset;
  to_transfer_id: string;
  from_transfer_id: string;
  rate: number;
};

export type ApiSwapsResponse = {
  swaps: ApiSwap[];
  status: "success" | "error";
};

export type Swap = {
  id: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  fromAmount: Amount;
  toAmount: Amount;
  rate: number;
};

export type RateAndChange = {
  rate: number;
  change: number;
};

export type PriceByCurrency = Record<Asset, RateAndChange>;
