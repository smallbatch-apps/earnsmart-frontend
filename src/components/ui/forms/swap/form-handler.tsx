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
import { cn } from "@/lib/utils";

export enum FormStep {
  MainForm,
  Summary,
  Confirm,
}

export interface FormFields {
  step: FormStep;
  from_amount: number;
  from_currency: Asset;
  to_amount: number;
  to_currency: Asset;
  rate: number;
}

type Props = {
  className?: string;
  showContent?: boolean;
  clickFn?: () => void;
};

export default function SwapForm({
  className,
  showContent = true,
  clickFn = () => {},
}: Props) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const methods = useForm<FormFields>({
    defaultValues: {
      step: FormStep.MainForm,
      to_amount: 0,
      to_currency: "ADA",
      from_amount: 0,
      from_currency: "ETH",
      rate: 0,
    },
  });

  const { watch, handleSubmit } = methods;
  const step = watch("step");

  const onSubmit = (data: FormFields) => {
    const { step, ...remaining } = data;
    const transaction_type = TransactionType.Deposit;
    clientPost("/swap", {
      ...remaining,
      transaction_type,
    }).then(async (response) => {
      const responseData = (await response.json()) as ApiTransactionsResponse;
      const transactions = parseTransactions(responseData);
      setTransaction(transactions[0]);
    });
  };

  const title =
    step === FormStep.MainForm
      ? "Swap cryptocurrencies"
      : step === FormStep.Summary
      ? "Swap - Review swap details"
      : "Swap confirmed";
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
            Swap cryptocurrencies between your accounts
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
