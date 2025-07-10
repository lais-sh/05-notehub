import * as React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.currentTarget.value);
  };

  return (
    <input
      className={css.input}
      type="search"
      name="search"
      placeholder="Search notes..."
      value={value}
      onChange={handleInputChange}
      autoComplete="off"
    />
  );
}

