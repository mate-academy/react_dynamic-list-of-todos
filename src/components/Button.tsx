import React from 'react';

type Props = {
  filterButtons: FilterButton[];
};

export const Button: React.FC<Props> = ({ filterButtons }) => {
  return (
    <div className="buttons_panel">
      {filterButtons.map(({ id, title, func }) => (
        <button
          type="button"
          key={id}
          id={id.toString()}
          onClick={func}
        >
          {title}
        </button>
      ))}
    </div>
  );
};
