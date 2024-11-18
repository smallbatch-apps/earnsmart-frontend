"use client";

import Amount from "@/utils/Amount";

import * as React from "react";

type Props = {
  amount: Amount;
};

export default function Component({ amount }: Props) {
  if (amount.isZero()) {
    return <>-</>;
  }
  return (
    <div className="flex flex-col">
      <div className="font-semibold -mb-1">{amount.localAmount()}</div>
      <div className="text-sm text-gray-500">{amount.localAmountFiat()}</div>
    </div>
  );
}
