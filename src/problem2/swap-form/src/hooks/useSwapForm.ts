import { useState, useMemo, useCallback } from "react";
import type { TokenWithIcon } from "../types/token";
import { formatBalance } from "../utils/formatBalance";

export const useSwapForm = (availableTokens: TokenWithIcon[]) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Initialize default tokens
  const [sellToken, setSellToken] = useState<TokenWithIcon | null>(() => {
    if (availableTokens.length > 0) {
      return (
        availableTokens.find((t) => t.currency === "ETH") || availableTokens[0]
      );
    }
    return null;
  });

  const [buyToken, setBuyToken] = useState<TokenWithIcon | null>(() => {
    if (availableTokens.length > 0) {
      return (
        availableTokens.find((t) => t.currency === "USDC") ||
        availableTokens[1]
      );
    }
    return null;
  });

  const [sellAmount, setSellAmount] = useState("");

  // Calculate buy amount based on exchange rate
  const buyAmount = useMemo(() => {
    if (sellAmount && sellToken && buyToken) {
      const sellValue = parseFloat(sellAmount);
      if (!isNaN(sellValue) && sellValue > 0) {
        const sellTokenValue = sellValue * sellToken.price;
        const buyTokenAmount = sellTokenValue / buyToken.price;
        return buyTokenAmount.toFixed(6);
      }
    }
    return "";
  }, [sellAmount, sellToken, buyToken]);

  // Calculate USD values
  const sellValue = useMemo(
    () => (sellToken ? formatBalance(sellAmount, sellToken.price) : "$0"),
    [sellAmount, sellToken]
  );

  const buyValue = useMemo(
    () => (buyToken ? formatBalance(buyAmount, buyToken.price) : "$0"),
    [buyAmount, buyToken]
  );

  const handleSellAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setSellAmount(value);
        setError("");
      }
    },
    []
  );

  const handleSwap = useCallback(() => {
    if (!sellToken || !buyToken) return;

    const tempToken = sellToken;
    setSellToken(buyToken);
    setBuyToken(tempToken);
    setSellAmount(buyAmount);
  }, [sellToken, buyToken, buyAmount]);

  const handleSubmit = useCallback(async () => {
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!sellToken || !buyToken) {
      setError("Please select tokens");
      return;
    }

    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    alert(
      `Swap successful!\n${sellAmount} ${sellToken.symbol} → ${buyAmount} ${buyToken.symbol}`
    );
    setSellAmount("");
  }, [sellAmount, sellToken, buyToken, buyAmount]);

  // Set default tokens when available tokens are loaded
  if (availableTokens.length > 0 && !sellToken && !buyToken) {
    const ethToken = availableTokens.find((t) => t.currency === "ETH");
    const usdcToken = availableTokens.find((t) => t.currency === "USDC");
    setSellToken(ethToken || availableTokens[0]);
    setBuyToken(usdcToken || availableTokens[1]);
  }

  return {
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
  };
};
