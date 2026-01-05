import arrow from "../assets/icons/arrow.svg";

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <div className="container-swap-button">
      <button onClick={onClick} className="btn-swap-arrow">
        <img src={arrow} alt="Swap Tokens" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SwapButton;
