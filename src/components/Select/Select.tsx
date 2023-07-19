import React from 'react';
import { Filters, Status } from '../../types';

const options = [
  { value: Status.All, label: 'All' },
  { value: Status.Active, label: 'Active' },
  { value: Status.Completed, label: 'Completed' },

];

type Props = {

  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
};

export const Select: React.FC<Props> = ({
  filters,
  onFiltersChange,
}) => {
  const onSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      status: e.target.value as Status,
    });
  };

  return (
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filters.status}
          onChange={onSelectionChange}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </span>
    </p>
  );
};
