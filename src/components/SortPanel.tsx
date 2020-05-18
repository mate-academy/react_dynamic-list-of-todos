import React, { useState } from 'react';

const buttons = [
  { name: 'Sort by Name', sortType: 'title' },
  { name: 'Sort by Completed', sortType: 'completed' },
  { name: 'Sort by User Name', sortType: 'user' },
];

type PropsSort = {
  sorted: (sorted: string) => void;
};

export const SortPanel: React.FC<PropsSort> = ({ sorted }) => {
  const [activeBtn, setActiveBtn] = useState('');

  return (
    <p>
      {buttons.map(button => {
        return (
          <button
            type="button"
            key={button.name}
            onClick={() => {
              setActiveBtn(button.sortType);
              sorted(button.sortType);
            }}
            className={button.sortType === activeBtn ? 'btn btn-warning active' : 'btn btn-warning'}
          >
            {button.name}
          </button>
        );
      })}
    </p>
  );
};
