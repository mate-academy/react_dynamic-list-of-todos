import React, { FC } from 'react';
import { filterButtonsData } from './FilterButtonsData';
import { Sorting } from '../interfaces/interfaces';
import { Button } from '../LoadButton/Button';

interface Props {
  onFilterTodos: (callBack: Sorting) => void;
}

export const FilterButtons: FC<Props> = (props) => {
  const { onFilterTodos } = props;

  return (
    <div className="w-100 d-flex justify-content-around">
      {filterButtonsData.map(button => (
        <Button
          key={button.title}
          onLoadData={() => onFilterTodos(button.sortingPattern)}
          title={button.title}
        />
      ))}
    </div>
  );
};
