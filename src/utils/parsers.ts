import type {
  ApiBalanceResponse,
  ApiFundBalanceResponse,
  ApiBalance,
  Balance,
  ApiActivityResponse,
  Activity,
  ApiSettingsResponse,
  Setting,
  ApiTransactionsResponse,
  Transaction,
  ApiSwapsResponse,
  Swap,
  ApiPricesResponse,
  Price,
  ApiUserResponse,
  User,
  Asset,
} from "@/types";

import Amount from "@/utils/Amount";
import { allCurrencies, transactionTypeStrings } from "@/types";

type BalancePartial = Partial<Record<Asset, Balance>>;

export const parseBalances = (
  balanceResponse: ApiBalanceResponse
): BalancePartial => {
  return balanceResponse.accounts.reduce(
    accountReducer,
    {} as Partial<Record<Asset, Balance>>
  );
};

export const parseFundBalances = (
  balanceResponse: ApiFundBalanceResponse
): BalancePartial => {
  return balanceResponse.fund_accounts.reduce(
    accountReducer,
    {} as Partial<Record<Asset, Balance>>
  );
};

const accountReducer = (balances: BalancePartial, account: ApiBalance) => {
  balances[account.currency as Asset] = {
    id: +account.id,
    code: account.code,
    ledger: account.ledger,
    balance: new Amount(
      account.balance,
      allCurrencies[account.currency],
      account.balance_usd.toString()
    ),
    balancePending: new Amount(
      account.balance_pending,
      allCurrencies[account.currency],
      account.balance_pending_usd.toString()
    ),
    createdAt: new Date(account.timestamp),
  };

  return balances;
};

export const parseActivies = (response: ApiActivityResponse): Activity[] => {
  return response.activities.map((activity) => ({
    id: activity.id,
    type: activity.type,
    message: activity.message,
    createdAt: new Date(activity.created_at),
  }));
};

export const parseSettings = (response: ApiSettingsResponse): Setting[] => {
  return response.settings.map((setting) => ({
    id: setting.id,
    type: setting.type,
    name: setting.name,
    value: setting.value,
    createdAt: new Date(setting.created_at),
    updatedAt: new Date(setting.updated_at),
    deletedAt: setting.deleted_at ? new Date(setting.deleted_at) : null,
  }));
};

export const parseTransactions = (
  response: ApiTransactionsResponse
): Transaction[] => {
  return response.transactions.map((transaction) => ({
    id: transaction.id,
    amount: new Amount(
      transaction.amount,
      allCurrencies[transaction.currency],
      transaction.amount_usd.toString()
    ),
    address: transaction.address ?? "",
    code: transaction.code,
    transactionType: transactionTypeStrings[transaction.code],
    timestamp: new Date(transaction.timestamp),
    debitAccountId: transaction.debit_account_id,
    creditAccountId: transaction.credit_account_id,
  }));
};

export const parseSwaps = (response: ApiSwapsResponse): Swap[] => {
  return response.swaps.map((swap) => ({
    id: swap.id,
    fromAmount: new Amount(swap.from_amount, allCurrencies[swap.from_currency]),
    toAmount: new Amount(swap.to_amount, allCurrencies[swap.to_currency]),
    rate: swap.rate,
    status: swap.status,
    createdAt: new Date(swap.created_at),
    updatedAt: new Date(swap.updated_at),
    deletedAt: swap.deleted_at ? new Date(swap.deleted_at) : null,
  }));
};

export const parsePrices = (response: ApiPricesResponse): Price[] => {
  return response.prices.map((price) => ({
    id: price.id,
    currency: price.currency,
    rate: price.rate,
    updatedAt: price.updated_at,
    change24h: price.change_24h,
  }));
};

export const parseUser = (response: ApiUserResponse): User => {
  const user = response.user;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.created_at),
    updatedAt: new Date(user.updated_at),
    deletedAt: user.deleted_at ? new Date(user.deleted_at) : null,
  };
};
