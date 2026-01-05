import search from "../../assets/icons/search.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="p-3 sm:p-4 border-b border-gray-100">
      <div className="relative">
        <img
          src={search}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          alt="Search"
        />
        <input
          type="text"
          placeholder="Search token name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-green-300 focus:ring-2 focus:ring-green-100 transition-all"
          autoFocus
        />
      </div>
    </div>
  );
};

export default SearchInput;
