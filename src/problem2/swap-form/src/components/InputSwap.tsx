import { useMemo } from "react";
import SwapInput from "./SwapInput";
import SwapButton from "./SwapButton";
import { useTokenPrices } from "../hooks/useTokenPrices";
import { useSwapForm } from "../hooks/useSwapForm";

const ICON_BASE_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

const InputSwap = () => {
  const { tokens, loading: loadingPrices } = useTokenPrices();

  const availableTokens = useMemo(() => {
    return tokens.map((token) => ({
      ...token,
      icon: `${ICON_BASE_URL}/${token.currency}.svg`,
      symbol: token.currency,
    }));
  }, [tokens]);

  const {
    sellToken,
    setSellToken,
    buyToken,
    setBuyToken,
    sellAmount,
    buyAmount,
    sellValue,
    buyValue,
    error,
    loading,
    handleSellAmountChange,
    handleSwap,
    handleSubmit,
  } = useSwapForm(availableTokens);

  if (loadingPrices || !sellToken || !buyToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner-loading"></div>
          <p className="text-sm text-gray-500">Loading tokens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-swap">
      <SwapInput
        label="Sell"
        value={sellAmount}
        onChange={handleSellAmountChange}
        selectedToken={sellToken}
        onSelectToken={setSellToken}
        availableTokens={availableTokens}
        balance={sellValue}
        error={error}
      />

      <SwapButton onClick={handleSwap} />

      <SwapInput
        label="Buy"
        value={buyAmount}
        onChange={() => {}} // Read-only
        selectedToken={buyToken}
        onSelectToken={setBuyToken}
        availableTokens={availableTokens}
        balance={buyValue}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !sellAmount || parseFloat(sellAmount) <= 0}
        className={`btn-submit ${
          loading || !sellAmount || parseFloat(sellAmount) <= 0
            ? "btn-submit-disabled"
            : "btn-submit-primary"
        }`}
      >
        {loading ? (
          <>
            <div className="spinner spinner-primary"></div>
            <span>Processing...</span>
          </>
        ) : (
          "Swap"
        )}
      </button>
    </div>
  );
};

export default InputSwap;
