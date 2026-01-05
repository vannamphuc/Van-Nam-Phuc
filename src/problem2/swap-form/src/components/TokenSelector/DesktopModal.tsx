import { motion } from "framer-motion";
import type { TokenWithIcon } from "../../types/token";
import ModalHeader from "./ModalHeader";
import SearchInput from "./SearchInput";
import TokenItem from "./TokenItem";
import TokenSkeleton from "./TokenSkeleton";
import EmptyState from "./EmptyState";

interface DesktopModalProps {
  tokens: TokenWithIcon[];
  filteredTokens: TokenWithIcon[];
  selectedToken: TokenWithIcon;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectToken: (token: TokenWithIcon) => void;
  onClose: () => void;
}

const DesktopModal = ({
  tokens,
  filteredTokens,
  selectedToken,
  searchQuery,
  onSearchChange,
  onSelectToken,
  onClose,
}: DesktopModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white w-full max-w-md flex flex-col overflow-hidden max-h-150 rounded-3xl shadow-2xl"
    >
      <ModalHeader onClose={onClose} showDragIndicator={false} />
      <SearchInput value={searchQuery} onChange={onSearchChange} />

      {/* Token List */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {tokens.length === 0 ? (
          <>
            <TokenSkeleton />
            <TokenSkeleton />
            <TokenSkeleton />
            <TokenSkeleton />
            <TokenSkeleton />
          </>
        ) : filteredTokens.length > 0 ? (
          filteredTokens.map((token) => (
            <TokenItem
              key={token.symbol}
              token={token}
              isSelected={selectedToken.symbol === token.symbol}
              onSelect={onSelectToken}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </motion.div>
  );
};

export default DesktopModal;
