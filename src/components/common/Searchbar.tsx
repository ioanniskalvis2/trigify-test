import { type ChangeEventHandler } from "react";

interface SearchBarProps {
  value?: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = ({ value, placeholder, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input input-bordered input-primary w-full max-w-xs"
    />
  );
};

export default SearchBar;
