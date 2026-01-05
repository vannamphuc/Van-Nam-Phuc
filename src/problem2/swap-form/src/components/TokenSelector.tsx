import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TokenWithIcon } from "../types/token";
import { useTokenSelector } from "../hooks/useTokenSelector";
import MobileBottomSheet from "./TokenSelector/MobileBottomSheet";
import DesktopModal from "./TokenSelector/DesktopModal";
import dropdown from "../assets/icons/dropdown.svg";

interface TokenSelectorProps {
  tokens: TokenWithIcon[];
  selectedToken: TokenWithIcon;
  onSelectToken: (token: TokenWithIcon) => void;
}

const TokenSelector = ({
  tokens,
  selectedToken,
  onSelectToken,
}: TokenSelectorProps) => {
  const {
    isOpen,
    searchQuery,
    filteredTokens,
    handleOpen,
    handleClose,
    setSearchQuery,
  } = useTokenSelector(tokens);

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = (token: TokenWithIcon) => {
    onSelectToken(token);
    handleClose();
  };

  return (
    <>
      <button onClick={handleOpen} className="btn-token-selector">
        <img
          height="20"
          width="20"
          src={selectedToken.icon}
          alt={selectedToken.symbol}
          className="token-icon"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-token-symbol">{selectedToken.symbol}</span>
        <img
          src={dropdown}
          alt="Dropdown"
          className="w-3.5 h-3.5 text-gray-400 -rotate-90"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="modal-backdrop"
              onClick={handleClose}
            />

            {/* Modal/Bottom Sheet Container */}
            {isMobile ? (
              <MobileBottomSheet
                tokens={tokens}
                filteredTokens={filteredTokens}
                selectedToken={selectedToken}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectToken={handleSelect}
                onClose={handleClose}
              />
            ) : (
              <div className="modal-container" onClick={handleClose}>
                <DesktopModal
                  tokens={tokens}
                  filteredTokens={filteredTokens}
                  selectedToken={selectedToken}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSelectToken={handleSelect}
                  onClose={handleClose}
                />
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TokenSelector;
