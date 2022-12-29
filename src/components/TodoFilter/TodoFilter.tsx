import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  allTodos:Todo[];
  setFilterTodos: (allTodos: Todo[]) => void;
  filterTodos: Todo[];
};

export const TodoFilter: React.FC<Props>
= ({ allTodos, setFilterTodos, filterTodos }) => {
  const [selection, setSelection] = useState('');
  const [query, setQuery] = useState('');

  const searchTitle = (input: string) => {
    const inputToLowercase = input.toLocaleLowerCase();

    const todos = allTodos.filter((todo: Todo) => (
      todo.title.toLocaleLowerCase().includes(inputToLowercase)
    ));

    setFilterTodos(todos);
  };

  const handleClick = () => {
    setQuery('');
    setFilterTodos(allTodos);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(event.target.value);

    switch (event.target.value) {
      case 'all':
        return setFilterTodos(allTodos);

      case 'active':
        return setFilterTodos(allTodos.filter(el => el.completed));

      case 'completed':
        return setFilterTodos(allTodos.filter(el => !el.completed));

      default:
        break;
    }

    return filterTodos;
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selection}
            onChange={handleChange}
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
            searchTitle(query);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClick}
          />
        </span>
      </p>
    </form>
  );
};
