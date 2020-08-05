import React, { FC } from 'react';
import { buttons } from '../../utilities/constants';
import { FilterButton } from '../FilterButton/FilterButton';
import { SortCallback } from '../../interfaces';

interface Props {
  sortTodos: (callback: SortCallback) => void;
}

export const FilterButtons: FC<Props> = ({ sortTodos }) => {
  return (
    <>
      {
        buttons.map(button => (
          <FilterButton
            key={button.id}
            content={button.title}
            onClick={() => sortTodos(button.callback)}
          />
        ))
      }
    </>
  );
};
