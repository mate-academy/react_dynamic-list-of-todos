import React, { useEffect, useState } from 'react';
import { getFilteredTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  setTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ setTodos = () => {} }) => {
  const [query, setQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setQuery(newValue);
  };

  // const normalizedQuery = query.toLowerCase();

  const handleDelete = () => {
    setSelectedValue('all');
    setQuery('');
  };

  useEffect(() => {
    if (query) {
      getFilteredTodos(selectedValue)
        .then(todos =>
          todos.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          ),
        )
        .then(setTodos);
    } else {
      getFilteredTodos(selectedValue).then(setTodos);
    }
  }, [selectedValue, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              setSelectedValue(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active </option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => {
            handleQueryChange(event);
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => {
                handleDelete();
              }}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
