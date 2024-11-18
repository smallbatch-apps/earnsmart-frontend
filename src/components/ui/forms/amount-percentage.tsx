import Amount from "@/utils/Amount";
import { useFormContext } from "react-hook-form";

const setOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
};

interface Props {
  amountName?: string;
  asset: Amount;
  maximum?: Amount | null;
  minimum?: Amount | null;
  setCurrentPercentage?: (value: number) => void;
}

export default function AmountPercentage({
  amountName = "amount",
  asset,
  maximum = null,
  minimum = null,
  setCurrentPercentage = () => {},
}: Readonly<Props>) {
  const { setValue } = useFormContext();

  const setPercentage = (
    percentage: number,
    maximum: Amount | null,
    minimum: Amount | null
  ) => {
    const percentageAmount = asset.multiplyPercentage(percentage);
    setCurrentPercentage(percentage);

    if (minimum && asset.asBigNumber().isLessThan(minimum.asBigNumber())) {
      setValue(amountName, asset.down(), setOptions);
      return;
    }

    if (maximum?.isLessThanValue(percentageAmount)) {
      setValue(amountName, maximum.toFloat().toString(), setOptions);
      return;
    }

    if (minimum?.isMoreThanValue(percentageAmount)) {
      setValue(amountName, minimum.toFloat().toString(), setOptions);
      return;
    }
    setValue(amountName, percentageAmount.toString(), setOptions);
  };
  return (
    <div className="flex items-center gap-2 ">
      <div
        className="border rounded-sm p-2 py-1 cursor-pointer"
        onClick={() => setPercentage(1, maximum, minimum)}
      >
        Max
      </div>
    </div>
  );
}
