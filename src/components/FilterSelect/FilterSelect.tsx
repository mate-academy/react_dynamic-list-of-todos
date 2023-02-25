import { Select } from '../../types/Select';

interface Props {
  filter: Select;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterSelect: React.FC<Props> = ({ filter, onFilterChange }) => (
  <p className="control">
    <span className="select">
      <select
        data-cy="statusSelect"
        value={filter}
        onChange={onFilterChange}
      >
        <option value={Select.ALL}>All</option>
        <option value={Select.ACTIVE}>Active</option>
        <option value={Select.COMPLETED}>Completed</option>
      </select>
    </span>
  </p>
);
