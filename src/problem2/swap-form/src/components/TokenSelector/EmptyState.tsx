import empty from "../../assets/icons/empty.svg";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <img src={empty} alt="Empty" className="w-12 h-12 text-gray-300 mb-3" />
      <p className="text-sm text-gray-500 text-center">No tokens found</p>
      <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
    </div>
  );
};

export default EmptyState;
