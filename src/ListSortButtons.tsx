import React from 'react';

interface Props {
  handleSortByTitle: () => void;
  handleSortByName: () => void;
  handleSortByCompleted: () => void;
}

export const ListSortButtons: React.FC<Props> = ({
  handleSortByTitle,
  handleSortByName,
  handleSortByCompleted,
}) => (
  <div className="App_sort-buttons">
    <button
      type="button"
      onClick={() => handleSortByTitle()}
      className="App_sort-button App_button__turquoise"
    >
      Sort by title
    </button>
    <button
      onClick={() => handleSortByCompleted()}
      type="button"
      className="App_sort-button App_button__turquoise"
    >
      Sort by completed
    </button>
    <button
      type="button"
      onClick={() => handleSortByName()}
      className="App_sort-button App_button__turquoise"
    >
      Sort by name
    </button>
  </div>
);
