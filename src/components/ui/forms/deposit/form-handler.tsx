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
  amount: number;
  currency: Asset;
}

type Props = {
  className?: string;
  showContent?: boolean;
  clickFn?: () => void;
};

export default function DepositForm({
  className,
  showContent = true,
  clickFn = () => {},
}: Props) {
  console.log("deposit form");
  console.log(clickFn);
  console.log("show content", showContent);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const methods = useForm<FormFields>({
    defaultValues: {
      step: FormStep.MainForm,
      amount: 0,
      currency: "ADA",
    },
  });

  const { watch, handleSubmit } = methods;
  const step = watch("step");

  const onSubmit = (data: FormFields) => {
    const { step, ...remaining } = data;
    const transaction_type = TransactionType.Deposit;
    clientPost("/transaction", {
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
      ? "Deposit funds"
      : step === FormStep.Summary
      ? "Deposit funds - Review deposit"
      : "Deposit confirmed";
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
            Deposit funds to invest or swap for other currencies
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
