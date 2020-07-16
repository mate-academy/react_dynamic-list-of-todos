import React, { FC } from 'react';

interface Props {
  onLoadData: () => void;
  title: string;
}

export const Button: FC<Props> = (props) => {
  const { onLoadData, title } = props;

  return (
    <button
      type="button"
      onClick={onLoadData}
    >
      {title}
    </button>
  );
};
