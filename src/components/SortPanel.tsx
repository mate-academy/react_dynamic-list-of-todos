import React from 'react';
import { SortPanelProps } from '../interfaces/interfaces';
import { Button } from './Button';

export const SortPanel: React.FC<SortPanelProps> = ({
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
