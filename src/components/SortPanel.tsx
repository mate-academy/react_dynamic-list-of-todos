import React, { FC } from 'react';
import { Button } from './Button';

export const SortPanel: FC<SortPanelProps> = ({
  handleSort,
}) => {
  return (
    <div className="sort-panel">
      <Button handleSort={handleSort} sortType="title" />
      <Button handleSort={handleSort} sortType="status" />
      <Button handleSort={handleSort} sortType="name" />
    </div>
  );
};
