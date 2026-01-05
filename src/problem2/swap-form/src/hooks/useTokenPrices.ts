import { useState, useEffect } from "react";
import type { Token } from "../types/token";

const PRICES_URL = "https://interview.switcheo.com/prices.json";

export const useTokenPrices = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(PRICES_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch prices");
        }
        const data: Token[] = await response.json();

        // Lọc tokens có price và loại bỏ duplicates
        const uniqueTokens = data.reduce((acc, token) => {
          if (token.price && token.price > 0) {
            const existing = acc.find((t) => t.currency === token.currency);
            if (!existing) {
              acc.push(token);
            }
          }
          return acc;
        }, [] as Token[]);

        setTokens(uniqueTokens);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { tokens, loading, error };
};
