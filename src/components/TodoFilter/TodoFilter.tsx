import React, { ChangeEvent } from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  query: string,
  setQuery: (input: React.SetStateAction<string>) => void,
  setTodoFilter: (status: React.SetStateAction<TodoStatus>) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setTodoFilter,
}) => {
  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => setQuery('');

  const changeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setTodoFilter(event.target.value as TodoStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={changeFilter}
          >
            <option value="all">{TodoStatus.All}</option>
            <option value="active">{TodoStatus.Active}</option>
            <option value="completed">{TodoStatus.Completed}</option>
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
          onChange={changeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
