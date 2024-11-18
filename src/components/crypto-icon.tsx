import type { Asset } from "@/types";

import AdaLogo from "@/assets/logos/ada-logo.svg";
import AvaxLogo from "@/assets/logos/avax-logo.svg";
import BnbLogo from "@/assets/logos/bnb-logo.svg";
import BatLogo from "@/assets/logos/bat-logo.svg";
import BtcLogo from "@/assets/logos/btc-logo.svg";
import EthLogo from "@/assets/logos/eth-logo.svg";
import SolLogo from "@/assets/logos/sol-logo.svg";
import HbarLogo from "@/assets/logos/hbar-logo.svg";
import LinkLogo from "@/assets/logos/link-logo.svg";
import TrxLogo from "@/assets/logos/trx-logo.svg";
import UniLogo from "@/assets/logos/uni-logo.svg";
import UsdcLogo from "@/assets/logos/usdc-logo.svg";
import UsdtLogo from "@/assets/logos/usdt-logo.svg";
import DaiLogo from "@/assets/logos/dai-logo.svg";
import DotLogo from "@/assets/logos/dot-logo.svg";
import MaticLogo from "@/assets/logos/matic-logo.svg";
import XrpLogo from "@/assets/logos/xrp-logo.svg";

const currencyMap: Record<Asset, React.ElementType> = {
  ADA: AdaLogo,
  AVAX: AvaxLogo,
  BAT: BatLogo,
  BNB: BnbLogo,
  BTC: BtcLogo,
  DAI: DaiLogo,
  DOT: DotLogo,
  ETH: EthLogo,
  HBAR: HbarLogo,
  LINK: LinkLogo,
  MATIC: MaticLogo,
  SOL: SolLogo,
  TRX: TrxLogo,
  UNI: UniLogo,
  USDC: UsdcLogo,
  USDT: UsdtLogo,
  XRP: XrpLogo,
};

export function CryptoIcon({ currency }: { currency: Asset }) {
  const Logo = currencyMap[currency];
  return (
    <div className="w-6 h-6">
      <Logo />
    </div>
  );
}
