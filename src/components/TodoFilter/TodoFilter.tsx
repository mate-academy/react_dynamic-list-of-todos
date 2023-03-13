import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  query: string,
  setQuery: (value: string) => void,
  filter: string,
  setFilter: (value: Filter) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filter,
  setFilter,
}) => {
  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const removeQuery = () => {
    setQuery('');
  };

  const changeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case 'active':
        setFilter(Filter.Active);
        break;
      case 'completed':
        setFilter(Filter.Completed);
        break;
      case 'all':
        setFilter(Filter.All);
        break;
      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={changeFilter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={changeQuery}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={(removeQuery)}
            />
          )}
        </span>
      </p>
    </form>
  );
};
