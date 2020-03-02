import React from 'react';

interface Props {
  text: string;
  disabled?: boolean;
  onClick?(): void;
}

export const Button: React.FC<Props> = props => {
  const { text, disabled, onClick } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
