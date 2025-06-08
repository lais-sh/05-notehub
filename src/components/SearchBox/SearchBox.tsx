import css from "./SearchBox.module.css";

interface SefrchBoxProps {
  onSearch: (value: string) => void;
  value: string;
}

export default function SearchBox({ value, onSearch }: SefrchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <input
      value={value}
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
