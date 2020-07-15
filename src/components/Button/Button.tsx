import React from 'react';

interface Props {
  disabled: boolean;
  isLoaded: boolean;
  listLoad: boolean;
  handleButtonLoad: () => void;
  sortByTitle: () => void;
  sortByStatus: () => void;
  sortByName: () => void;
}

export const Button: React.FC<Props> = (props) => {
  const {
    disabled,
    isLoaded,
    listLoad,
    sortByTitle,
    sortByStatus,
    handleButtonLoad,
    sortByName,
  } = props;

  return (
    <div className="wrapper">
      {
        listLoad
          ? (
            <>
              <button
                type="button"
                className="button"
                onClick={() => sortByTitle()}
              >
                Sort by title
              </button>
              <button
                type="button"
                className="button"
                onClick={() => sortByStatus()}
              >
                Sort by status
              </button>
              <button
                type="button"
                className="button"
                onClick={() => sortByName()}
              >
                Sort by name
              </button>
            </>
          )
          : (
            <button
              type="button"
              className="button"
              disabled={disabled}
              onClick={() => handleButtonLoad()}
            >
              {isLoaded ? 'Loading...' : 'Load'}
            </button>
          )
      }
    </div>
  );
};
