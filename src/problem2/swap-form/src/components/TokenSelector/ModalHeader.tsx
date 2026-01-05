import close from "../../assets/icons/close.svg";

interface ModalHeaderProps {
  onClose: () => void;
  showDragIndicator?: boolean;
}

const ModalHeader = ({
  onClose,
  showDragIndicator = true,
}: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
      {/* Mobile: Drag indicator */}
      {showDragIndicator && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full sm:hidden" />
      )}

      <h2
        className={`text-lg sm:text-xl font-semibold text-gray-900 ${
          showDragIndicator ? "mt-3 sm:mt-0" : ""
        }`}
      >
        Select Token
      </h2>
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <img src={close} alt="Close" className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

export default ModalHeader;
