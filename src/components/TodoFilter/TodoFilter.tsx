import React from 'react';
import { Todo } from '../../types/Todo';
import { getActiveTodos, getCompletedTodos, getTodos } from '../../api';

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
  onTodosChange: (todos: Todo[]) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onTodosChange,
}) => {
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'active':
        getActiveTodos().then(onTodosChange);
        break;
      case 'completed':
        getCompletedTodos().then(onTodosChange);
        break;
      case 'all':
      default:
        getTodos()
          .then(onTodosChange)
          .catch(error => {
            throw error;
          });
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSort}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          spellCheck={false}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
