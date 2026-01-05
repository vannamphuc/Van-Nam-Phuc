import { type ChangeEvent } from "react";
import type { TokenWithIcon } from "../types/token";
import TokenSelector from "./TokenSelector";

interface SwapInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedToken: TokenWithIcon;
  onSelectToken: (token: TokenWithIcon) => void;
  availableTokens: TokenWithIcon[];
  balance: string;
  error?: string;
}

const SwapInput = ({
  label,
  value,
  onChange,
  selectedToken,
  onSelectToken,
  availableTokens,
  balance,
  error,
}: SwapInputProps) => {
  return (
    <div className="card-swap">
      <div className="flex flex-row justify-between items-start mb-2">
        <span className="text-label">{label}</span>
      </div>

      <div className="flex flex-row items-center justify-between mb-2">
        <input
          autoComplete="off"
          placeholder="0"
          inputMode="decimal"
          value={value}
          onChange={onChange}
          className={`input-amount ${
            value ? "input-amount-filled" : "input-amount-empty"
          }`}
        />

        <TokenSelector
          tokens={availableTokens}
          selectedToken={selectedToken}
          onSelectToken={onSelectToken}
        />
      </div>

      <div className="flex flex-row items-center justify-between">
        <span className="text-balance">{balance}</span>
        {error && <span className="text-error">{error}</span>}
      </div>
    </div>
  );
};

export default SwapInput;
