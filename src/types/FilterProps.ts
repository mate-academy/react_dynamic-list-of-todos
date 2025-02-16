import React from 'react';

export interface FilterProps {
  changeFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  clearQuery: () => void;
  query: string;
  changeQuery: (query: string) => void;
}
