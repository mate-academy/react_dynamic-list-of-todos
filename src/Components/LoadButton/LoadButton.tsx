import React, { FC } from 'react';

interface Props {
  onLoadData: () => void;
  // isLoad: boolean;
}

export const LoadButton: FC<Props> = (props) => {
  const { onLoadData } = props;

  return (
    <>
      <button
        type="button"
        onClick={onLoadData}
      >
        Load
      </button>
    </>
  );
};
