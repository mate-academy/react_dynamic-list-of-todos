import React, { FC } from 'react';
import { filterButtonsData } from './FilterButtonsData';
import { Sorting } from '../interfaces/interfaces';
import { Button } from '../LoadButton/LoadButton';

interface Props {
  onFilterTodos: (callBack: Sorting) => void;
}

export const FilterButtons: FC<Props> = (props) => {
  const { onFilterTodos } = props;

  return (
    <>
      {filterButtonsData.map(button => (
        <Button
          key={button.title}
          onLoadData={() => onFilterTodos(button.sortingPattern)}
          title={button.title}
        />
      ))}
    </>
  );
};
