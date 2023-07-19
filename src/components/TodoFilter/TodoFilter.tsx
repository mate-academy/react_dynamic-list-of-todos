import React from 'react';
import { Filters } from '../../types';
import { SearchInput } from '../SearchInput';
import { Select } from '../Select';

type Props = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filters,
  onFiltersChange,
}) => {
  return (
    <form className="field has-addons">

      <Select
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <SearchInput
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
    </form>
  );
};
