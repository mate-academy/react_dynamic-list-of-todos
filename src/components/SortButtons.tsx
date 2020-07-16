import React from 'react';
import { Button } from './Button';

interface Props {
  sortBy(value: string): void;
}

export const SortButtons: React.FC<Props> = ({ sortBy }) => (
  <div className="sort">
    <Button
      name="Sort by title"
      handle={() => {
        sortBy('title');
      }}
    />
    <Button
      name="Not completed first"
      handle={() => {
        sortBy('completed');
      }}
    />
    <Button
      name="Sort by user name"
      handle={() => {
        sortBy('userName');
      }}
    />
  </div>
);
