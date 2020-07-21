import React, { useState } from 'react';
import { DownloadTaskElements } from './interfaces';

export const DownloadTask = ({
  setButtonText,
  getData,
  buttonText,
}: DownloadTaskElements) => {
  const [buttonDisable, setButtonDisable] = useState(false);

  return (
    <button
      type="button"
      disabled={buttonDisable}
      onClick={
        () => {
          setButtonDisable(true);
          setButtonText('Loading');
          getData();
        }
      }
    >
      {buttonText}
    </button>
  );
};
