import { useForm } from "react-hook-form";
import { clientPost } from "@/utils/request";
import {
  allCurrencies,
  TransactionType,
  transactionTypeStrings,
  type Asset,
  type Transaction,
  type ApiTransactionsResponse,
} from "@/types";
import MainForm from "./main-form";
import Summary from "./summary";
import Form from "../form";
import { Card, CardHeader, CardTitle, CardDescription } from "../../card";
import Confirm from "./confirm";
import { useState } from "react";
import { parseTransactions } from "@/utils/parsers";
import { useBalances } from "@/hooks/stores/useBalances";
import { useActivities } from "@/hooks/stores/useActivities";
import { cn } from "@/lib/utils";

export enum FormStep {
  MainForm,
  Summary,
  Confirm,
}

export interface FormFields {
  step: FormStep;
  amount: number;
  currency: Asset;
  address: string;
  hasValidCurrencies: boolean;
}

type Props = {
  className?: string;
  showContent?: boolean;
  clickFn?: () => void;
};

export default function WithdrawForm({
  className,
  showContent = true,
  clickFn = () => {},
}: Props) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const { fetchBalances, balances } = useBalances();
  const { fetchActivities } = useActivities();

  const filteredBalances = Object.entries(balances)
    .filter(([_, balance]) => {
      return !balance.balance.isZero();
    })
    .map(([curr, _]) => curr as Asset);

  const methods = useForm<FormFields>({
    defaultValues: {
      step: FormStep.MainForm,
      amount: 0,
      currency: filteredBalances[0],
      address: "",
      hasValidCurrencies: filteredBalances.length > 0,
    },
  });

  const { watch, handleSubmit } = methods;
  const step = watch("step");

  const onSubmit = (data: FormFields) => {
    const { step, ...remaining } = data;
    const transaction_type = TransactionType.Withdraw;
    clientPost("/transaction", {
      ...remaining,
      transaction_type,
    }).then(async (response) => {
      const responseData = (await response.json()) as ApiTransactionsResponse;
      const transactions = parseTransactions(responseData);
      setTransaction(transactions[0]);
      fetchBalances();
      fetchActivities();
    });
  };

  const title =
    step === FormStep.MainForm
      ? "Withdraw funds"
      : step === FormStep.Summary
      ? "Withdraw funds - Review withdrawal"
      : "Withdrawal confirmed";

  const cardHeaderClasses = cn({ "cursor-pointer": !showContent });

  return (
    <Form
      form={methods}
      onSubmit={handleSubmit(onSubmit)}
      className={className}
    >
      <Card>
        <CardHeader
          className={cardHeaderClasses}
          onClick={!showContent ? clickFn : undefined}
        >
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Withdraw funds from your account to another cryptocurrency wallet
          </CardDescription>
        </CardHeader>
        {showContent && (
          <>
            {step === FormStep.MainForm && <MainForm />}
            {step === FormStep.Summary && <Summary />}
            {step === FormStep.Confirm && (
              <Confirm
                setTransaction={setTransaction}
                transaction={transaction}
              />
            )}
          </>
        )}
      </Card>
    </Form>
  );
}
