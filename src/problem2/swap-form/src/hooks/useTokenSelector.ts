import { useState, useEffect, useMemo } from "react";
import type { TokenWithIcon } from "../types/token";

export const useTokenSelector = (tokens: TokenWithIcon[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = useMemo(
    () =>
      tokens.filter((token) =>
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [tokens, searchQuery]
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return {
    isOpen,
    searchQuery,
    filteredTokens,
    handleOpen,
    handleClose,
    setSearchQuery,
  };
};
