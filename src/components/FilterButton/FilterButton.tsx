import React, { FC } from 'react';

interface Props {
  content: string;
  onClick: () => void;
}

export const FilterButton: FC<Props> = ({ content, onClick }) => {
  return (
    <button type="button" onClick={() => onClick()}>
      {content}
    </button>
  );
};
