import React, { useState } from 'react';

export const FilterContext = React.createContext({
  filter: {
    select: 'all',
    query: '',
    modalOn: false,
    todo: {
      completed: false,
      id: 0,
      title: '',
      userId: 0,
    },
  },
  setFilter: {} as React.Dispatch<React.SetStateAction<{
    select:string,
    query:string,
    modalOn: boolean,
    todo: {
      completed: boolean,
      id: number,
      title: string,
      userId: number,
    }, }>>,
});
type Props = {
  children:React.ReactNode
};

export const TodoFiltersProvider : React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState({
    select: 'all',
    query: '',
    modalOn: false,
    todo: {
      completed: false,
      id: 0,
      title: '',
      userId: 0,
    },
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
