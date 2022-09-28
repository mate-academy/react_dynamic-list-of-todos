import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setVisibleTodos: (todos: Todo[]) => void;
}

export const TodoFilter: React.FC<Props> = ({ todos, setVisibleTodos }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const querySelector = (todo: Todo) => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  );

  const todoFilter = () => {
    switch (status) {
      case 'completed':
        setVisibleTodos(todos.filter(todo => (
          todo.completed
          && querySelector(todo)
        )));
        break;
      case 'active':
        setVisibleTodos(todos.filter(todo => (
          !todo.completed
          && querySelector(todo)
        )));
        break;

      default: setVisibleTodos(todos.filter(todo => (
        querySelector(todo)
      )));
    }
  };

  useEffect(() => {
    todoFilter();
  }, [query, status]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => {
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
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== ''
          && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
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
