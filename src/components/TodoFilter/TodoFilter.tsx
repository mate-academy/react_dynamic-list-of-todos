import React from 'react';
import { Select } from '../../types/Select';

interface TodoFilterProps {
  search: string;
  onChangeInput: (v: string) => void;
  chooseStatus: (v: Select) => void;
  select: Select;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  search,
  onChangeInput = () => {},
  chooseStatus = () => {},
  select,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={event => chooseStatus(event.target.value as Select)}
          >
            <option value={Select.All}>All</option>
            <option value={Select.Active}>Active</option>
            <option value={Select.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={event => onChangeInput(event.target.value.trimStart())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
