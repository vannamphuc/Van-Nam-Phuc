import { useState } from "react";
import check from "../../assets/icons/check.svg";
import type { TokenWithIcon } from "../../types/token";

interface TokenItemProps {
  token: TokenWithIcon;
  isSelected: boolean;
  onSelect: (token: TokenWithIcon) => void;
}

const TokenItem = ({ token, isSelected, onSelect }: TokenItemProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <button
      onClick={() => onSelect(token)}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors ${
        isSelected ? "bg-green-50" : ""
      }`}
    >
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
        {imageLoading && (
          <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse"></div>
        )}
        <img
          src={token.icon}
          alt={token.symbol}
          className="w-full h-full rounded-full relative z-10"
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            setImageLoading(false);
          }}
        />
      </div>
      <div className="flex flex-col items-start flex-1 min-w-0">
        <span className="text-sm sm:text-base font-semibold text-gray-900">
          {token.symbol}
        </span>
        <span className="text-xs sm:text-sm text-gray-500">
          ${token.price.toFixed(6)}
        </span>
      </div>
      {isSelected && (
        <img
          src={check}
          alt="Selected"
          className="w-5 h-5 text-green-600 shrink-0"
        />
      )}
    </button>
  );
};

export default TokenItem;
