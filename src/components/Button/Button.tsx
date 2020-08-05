import React, { FC } from 'react';

interface Props {
  content: string;
  onClick: () => void;
}

export const Button: FC<Props> = ({ content, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
};
