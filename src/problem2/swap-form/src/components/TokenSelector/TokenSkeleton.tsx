const TokenSkeleton = () => (
  <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
    <div className="flex flex-col gap-1.5 flex-1">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-3 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

export default TokenSkeleton;
