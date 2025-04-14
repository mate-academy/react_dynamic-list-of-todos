import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  readonly startingTodos: Todo[];
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoFilter: React.FC<Props> = ({
  startingTodos,
  setVisibleTodos,
}) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');

  useEffect(() => {
    let filtered = [...startingTodos];

    if (option === 'active') {
      filtered = startingTodos.filter(todo => !todo.completed);
    } else if (option === 'completed') {
      filtered = startingTodos.filter(todo => todo.completed);
    }

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setVisibleTodos(filtered);
  }, [option, query, startingTodos, setVisibleTodos]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={event => setOption(event.target.value)}
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
        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
