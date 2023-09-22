import { useState } from 'react';
import { FilterOptions } from '../../types/FilterOptions';

type TodoFilterProps = {
  onFilterChange: (selectedOption: FilterOptions) => void;
  typedTitle: string;
  setTypedTitle: (title: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange, typedTitle, setTypedTitle,
}) => {
  const [selectedOption, setSelectedOption] = useState<FilterOptions>('all');

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const { value } = event.target;

    setSelectedOption(value as FilterOptions);
    onFilterChange(value as FilterOptions);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            title="select"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={typedTitle}
          onChange={(event) => setTypedTitle(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {typedTitle.length > 0
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                title="delete"
                onClick={() => setTypedTitle('')}
                aria-label="clearSearchButton"
              />
            )}

        </span>
      </p>
    </form>
  );
};
