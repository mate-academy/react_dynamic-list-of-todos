import React, { useState } from 'react';

export enum TypeFilter {
  ALL = 'all',
  DONE = 'active',
  PLANNED = 'completed',
}

interface SearchManager {
  value: SearchProto;
  setValue: (value: SearchProto) => void;
}

interface SearchProto {
  textValue: string;
  status: TypeFilter;
}

export const Search = React.createContext<SearchManager>({
  value: { textValue: '', status: TypeFilter.ALL },
  setValue: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [proto, setProto] = useState<SearchProto>({
    textValue: '',
    status: TypeFilter.ALL,
  });

  return (
    <Search.Provider
      value={{
        value: proto,
        setValue: (value: SearchProto) => setProto(value),
      }}
    >
      {children}
    </Search.Provider>
  );
};
