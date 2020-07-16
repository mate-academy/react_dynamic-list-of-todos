import React from 'react';

interface Props {
  name: string;
  handle(): void;
}

export const Button: React.FC<Props> = (props) => {
  const { name, handle } = props;

  return (
    <button
      className="sort__btn"
      type="button"
      onClick={handle}
    >
      {name}
    </button>
  );
};
