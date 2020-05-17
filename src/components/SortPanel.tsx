import React, { useState } from 'react';

const buttons = [
  { name: 'Sort by Name', sorted: 'title' },
  { name: 'Sort by Completed', sorted: 'completed' },
  { name: 'Sort by User Name', sorted: 'user' },
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
              setActiveBtn(button.sorted);
              sorted(button.sorted);
            }}
            className={button.sorted === activeBtn ? 'btn btn-warning active' : 'btn btn-warning'}
          >
            {button.name}
          </button>
        );
      })}
    </p>
  );
};
