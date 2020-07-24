import React from 'react';

interface Props {
  handleButtonLoad: () => void;
}

export const ListButton: React.FC<Props> = ({ handleButtonLoad }) => (
  <button
    type="button"
    onClick={() => handleButtonLoad()}
    className="App_button App_button__vinous"
  >
    Load
  </button>
);
