import React from 'react';
import { SortPanelProps } from '../interfaces/interfaces';

export const SortPanel: React.FC<SortPanelProps> = ({
  handleSort,
}) => {
  return (
    <div className="sort-panel">
      <button
        type="button"
        className="waves-effect waves-light btn mgb20"
        onClick={() => handleSort('title')}
      >
        Sort by title
      </button>
      <button
        type="button"
        className="waves-effect waves-light btn mgb20"
        onClick={() => handleSort('status')}
      >
        Sort by status
      </button>
      <button
        type="button"
        className="waves-effect waves-light btn mgb20"
        onClick={() => handleSort('name')}
      >
        Sort by name
      </button>
    </div>
  );
};
