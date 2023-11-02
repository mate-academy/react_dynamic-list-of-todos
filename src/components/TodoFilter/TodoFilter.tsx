import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { filter } from '../../helpers';
import { Filters } from '../../types/Filters';

type Props = {
  todos: Todo[],
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setFilteredTodos,
}) => {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<Filters>(Filters.all);

  useEffect(() => {
    const newTodos = filter(todos, filterBy, query);

    setFilteredTodos(newTodos);
  }, [filterBy, query, todos, setFilteredTodos]);

  const handleFilterBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as Filters);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterBy}
            className="is-capitalized"
          >
            {Object.keys(Filters).map(filterCategory => (
              <option
                value={filterCategory}
                className="is-capitalized"
              >
                {filterCategory}
              </option>
            ))}
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <>
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          </>
        )}
      </p>
    </form>
  );
};
