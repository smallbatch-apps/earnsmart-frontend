import { useState } from "react";

import DepositForm from "@/components/ui/forms/deposit/form-handler";
import WithdrawForm from "@/components/ui/forms/withdraw/form-handler";
import SwapForm from "@/components/ui/forms/swap/form-handler";

export default function QuickTransactions() {
  const [transactionOpen, setTransactionOpen] = useState<
    "deposit" | "withdraw" | "swap"
  >("swap");

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="text-2xl font-medium mt-6">Quick transactions</div>
      <DepositForm
        className="w-full"
        showContent={transactionOpen == "deposit"}
        clickFn={() => {
          console.log("clicked deposit");
          setTransactionOpen("deposit");
        }}
      />
      <WithdrawForm
        className="w-full"
        showContent={transactionOpen === "withdraw"}
        clickFn={() => setTransactionOpen("withdraw")}
      />

      <SwapForm
        className="w-full"
        showContent={transactionOpen === "swap"}
        clickFn={() => setTransactionOpen("swap")}
      />
    </div>
  );
}
