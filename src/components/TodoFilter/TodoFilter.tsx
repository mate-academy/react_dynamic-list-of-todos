import React from 'react';
import { FilterType, TodoOptions } from '../../types/Todo';

type Props = {
  options: TodoOptions;
  onChange: <K extends keyof TodoOptions>(
    key: K,
    newOption: TodoOptions[K],
  ) => void;
};

export const TodoFilter: React.FC<Props> = ({ options, onChange }) => {
  const handleInputClear = () => {
    onChange('query', '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="filterType"
            data-cy="statusSelect"
            value={options.filterType}
            onChange={event => {
              onChange(
                event.target.name as keyof TodoOptions,
                event.target.value as FilterType,
              );
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="query"
          value={options.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => {
            onChange(
              event.target.name as keyof TodoOptions,
              event.target.value as FilterType,
            );
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {options.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
