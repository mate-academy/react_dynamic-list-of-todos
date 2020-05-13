import React, { FC } from 'react';
import { Button } from './Button';

export const SortPanel: FC<SortPanelProps> = ({
  handleSort,
}) => {
  return (
    <div className="sort-panel">
      <Button
        handleSort={handleSort}
        title="sort by title"
        sortType="title"
      />
      <Button
        handleSort={handleSort}
        title="sort by status"
        sortType="status"
      />
      <Button
        handleSort={handleSort}
        title="sort by name"
        sortType="name"
      />
    </div>
  );
};
