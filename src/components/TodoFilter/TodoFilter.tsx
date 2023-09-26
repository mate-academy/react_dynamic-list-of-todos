import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Query } from '../../types/Query';

interface Props {
  todos: Todo[] | null;
  setTodos: (todos: Todo[]) => void;
}

const getSortedTodos = (
  todos: Todo[] | null,
  query?: Query,
  text?: string,
): Todo[] => {
  if (!todos) {
    return [];
  }

  let newTodos = [...todos];

  if (query) {
    switch (query) {
      case 'active': {
        newTodos = newTodos.filter(todo => !todo.completed);

        break;
      }

      case 'completed': {
        newTodos = newTodos.filter(todo => todo.completed);

        break;
      }

      default:
        newTodos = newTodos.sort(
          (todo1, todo2) => todo1.id - todo2.id,
        );

        break;
    }
  }

  if (text) {
    newTodos = newTodos
      .filter(todo => todo.title.toLowerCase().includes(text.toLowerCase()));
  }

  return newTodos;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setTodos = () => { },
}) => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState<Query>('all');

  useEffect(() => {
    const newTodos = getSortedTodos(todos, query, input);

    setTodos(newTodos);
  }, [query, input]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={query}
            onChange={event => setQuery(event.target.value as Query)}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={input}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          !!input.length && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearInput}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
