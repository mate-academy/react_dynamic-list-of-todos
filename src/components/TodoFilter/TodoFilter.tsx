import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setVisibleTodos: (todos: Todo[]) => void;
};

export const TodoFilter = ({ todos, setVisibleTodos }: Props) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    let visibleTodos = [...todos];

    switch (status) {
      case 'active':
        visibleTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        visibleTodos = todos.filter(todo => todo.completed);
        break;
    }

    if (query) {
      visibleTodos = visibleTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setVisibleTodos(visibleTodos);
  }, [status, query, todos, setVisibleTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => {
              setStatus(event.target.value);
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
          placeholder="Search..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                setVisibleTodos(todos);
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
