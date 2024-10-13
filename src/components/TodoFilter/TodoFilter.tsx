import { TodosType } from '../../types/TodosType';
import React from 'react';
import { FilterInstructions } from '../../types/FilterInstructions';

interface Props {
  onFilterChange: (newValue: TodosType | string, fieldName: string) => void;
  filterInstructions: FilterInstructions;
}

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  filterInstructions,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={changeEvent =>
            onFilterChange(changeEvent.target.value as TodosType, 'todosType')
          }
          value={filterInstructions.todosType}
        >
          <option value={TodosType.All}>All</option>
          <option value={TodosType.Active}>Active</option>
          <option value={TodosType.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={filterInstructions.todoName}
        onChange={changeEvent =>
          onFilterChange(changeEvent.target.value, 'todoName')
        }
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {filterInstructions.todoName && (
          <button
            onClick={() => onFilterChange('', 'todoName')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
