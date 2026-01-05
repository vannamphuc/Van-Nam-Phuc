import { motion, type PanInfo } from "framer-motion";
import { useState } from "react";
import type { TokenWithIcon } from "../../types/token";
import ModalHeader from "./ModalHeader";
import SearchInput from "./SearchInput";
import TokenItem from "./TokenItem";
import TokenSkeleton from "./TokenSkeleton";
import EmptyState from "./EmptyState";

interface MobileBottomSheetProps {
  tokens: TokenWithIcon[];
  filteredTokens: TokenWithIcon[];
  selectedToken: TokenWithIcon;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectToken: (token: TokenWithIcon) => void;
  onClose: () => void;
}

const MobileBottomSheet = ({
  tokens,
  filteredTokens,
  selectedToken,
  searchQuery,
  onSearchChange,
  onSelectToken,
  onClose,
}: MobileBottomSheetProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    // Close if dragged down more than 100px
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]"
    >
      {/* Drag Indicator */}
      <div className="flex justify-center pt-2 pb-1">
        <div className="w-12 h-1 bg-gray-300 rounded-full" />
      </div>

      <ModalHeader onClose={onClose} showDragIndicator={false} />
      <SearchInput value={searchQuery} onChange={onSearchChange} />

      {/* Token List */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ pointerEvents: isDragging ? "none" : "auto" }}
      >
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

      {/* Safe area padding for mobile */}
      <div className="h-safe-area-inset-bottom" />
    </motion.div>
  );
};

export default MobileBottomSheet;
