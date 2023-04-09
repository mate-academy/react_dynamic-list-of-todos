import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onFilter: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoFilter: React.FC<Props> = ({ todos, onFilter }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelected] = useState('all');

  useEffect(() => {
    const filteredTodos = todos
      .filter(todo => {
        const lowecasedQuery = query.toLocaleLowerCase();
        const lowercasedTitle = todo.title.toLocaleLowerCase();
        const fitsQuery = lowercasedTitle.includes(lowecasedQuery);

        switch (selectedFilter) {
          case 'active':
            return !todo.completed && fitsQuery;
          case 'completed':
            return todo.completed && fitsQuery;
          default:
            return fitsQuery;
        }
      });

    onFilter(filteredTodos);
  }, [query, selectedFilter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(event) => {
              setSelected(event.target.value);
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
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          placeholder="Search..."
          onChange={(event => {
            setQuery(event.target.value);
          })}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label=" "
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
