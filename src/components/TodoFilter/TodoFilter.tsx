import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSetVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoFilter: React.FC<Props> = ({ todos, onSetVisibleTodos }) => {
  const [query, setQuery] = useState('');
  const handleSelectChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    switch (target.value) {
      case 'all':
        onSetVisibleTodos(todos);
        break;

      case 'active':
        onSetVisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        onSetVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    onSetVisibleTodos(todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase())));
  }, [query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
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
          onChange={({ target }) => setQuery(target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onSetVisibleTodos(todos);
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
