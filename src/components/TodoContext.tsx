import { createContext, useState } from 'react';
import { FilteringType } from './TodoFilter';
import React from 'react';

type ContextType = {
  filterButton: FilteringType;
  setFilterButton: (button: FilteringType) => void;
  searchedText: string;
  setSearchedText: (text: string) => void;
};

const provideContext: ContextType = {
  filterButton: FilteringType.All,
  setFilterButton: () => {},
  searchedText: '',
  setSearchedText: () => {},
};

export const createdContext = createContext<ContextType>(provideContext);

type Props = {
  children: React.ReactNode;
};

export const ToDoContext: React.FC<Props> = ({ children }) => {
  const [filterButton, setFilterButton] = useState<FilteringType>(
    FilteringType.All,
  );
  const [searchedText, setSearchedText] = useState<string>('');

  return (
    <createdContext.Provider
      value={{
        filterButton,
        setFilterButton,
        searchedText,
        setSearchedText,
      }}
    >
      {children}
    </createdContext.Provider>
  );
};
