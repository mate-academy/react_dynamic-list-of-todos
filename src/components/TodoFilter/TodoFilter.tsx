import React, { ChangeEvent } from 'react';
import { TypeOfTodos } from '../../types/TypeOfTodos';

type Props = {
  query: string;
  setQuery: (arg: string) => void;
  filterType: string;
  setFilterType: (arg: TypeOfTodos) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query, setQuery, filterType, setFilterType,
}) => {
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChangeFilterType = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case TypeOfTodos.ACTIVE:
        return setFilterType(TypeOfTodos.ACTIVE);
      case TypeOfTodos.COMPLETED:
        return setFilterType(TypeOfTodos.COMPLETED);

      default:
        return setFilterType(TypeOfTodos.ALL);
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleChangeFilterType}
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
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
