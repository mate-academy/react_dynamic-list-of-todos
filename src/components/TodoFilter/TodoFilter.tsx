import React, { ChangeEvent } from 'react';
import { TodosType } from '../../types/TodosType';

type Props = {
  option: string,
  onTodoTypeChange: (t: string) => void,
  filter: string,
  handleFilterChange: (t: string) => void,
  handleFilterClear: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  option,
  onTodoTypeChange,
  filter,
  handleFilterChange,
  handleFilterClear,
}) => {
  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={(event) => onTodoTypeChange(event.target.value)}
          >
            <option value={TodosType.ALL}>All</option>
            <option value={TodosType.ACTIVE}>Active</option>
            <option value={TodosType.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter}
          onChange={onFilterChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          filter && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleFilterClear}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
