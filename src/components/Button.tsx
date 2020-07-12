import React from 'react';

interface ButtonProps {
  name: string;
  handle(): void;
}

export const Button: React.FC<ButtonProps> = (props) => {
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
