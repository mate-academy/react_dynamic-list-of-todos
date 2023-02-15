import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  option: string;
  setOption: (option: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({
  option,
  setOption,
  query,
  setQuery,
}) => {
  const handleOptionValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'active':
        return setOption(Filter.Active);

      case 'completed':
        return setOption(Filter.Completed);

      default:
        return setOption(Filter.All);
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={handleOptionValue}
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
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            >
              x
            </button>
          )}
        </span>
      </p>
    </form>
  );
};
