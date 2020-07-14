import React, { MouseEvent } from 'react';
import { BUTTONS } from './api/api';

type Props = {
  sortByFilter: (arg: MouseEvent<HTMLButtonElement>) => void;
};

export const Buttons: React.FC<Props> = ({ sortByFilter }) => {
  return (
    <div className="buttons">
      {BUTTONS.map(button => (
        <button
          className="button"
          type="button"
          name={button.name}
          onClick={(event) => sortByFilter(event)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};
