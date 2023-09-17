import React, { useContext } from 'react';

import { TodoContext } from '../../context/ContextTodo';

import { ETodoStatus, Todo } from '../../types/Todo';

interface ITodosQuery {
  inputField?: string;
  filteredBy?: ETodoStatus;
}

export function getPreparedTodos(todos: Todo[], {
  inputField = '',
  filteredBy = ETodoStatus.ALL,
}: ITodosQuery) {
  let preparedTodos = [...todos];

  if (inputField) {
    const searchQueryLowerCase = inputField.toLowerCase().trim();

    preparedTodos = preparedTodos.filter(({ title }) => (
      title.toLowerCase().includes(searchQueryLowerCase)
    ));
  }

  if (filteredBy !== ETodoStatus.ALL) {
    switch (filteredBy) {
      case ETodoStatus.Active:
        return preparedTodos.filter(({ completed }) => !completed);

      case ETodoStatus.Completed:
        return preparedTodos.filter(({ completed }) => completed);

      default:
        throw new Error('Invalid select status');
    }
  }

  return preparedTodos;
}

export const TodoFilter = () => {
  const {
    inputField,
    setInputField,
    setFilteredBy,
    filteredBy,
  } = useContext(TodoContext);

  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredBy(event.currentTarget.value as ETodoStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteredBy}
            onChange={handleSelectStatus}
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
          value={inputField}
          onChange={(event) => setInputField(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputField && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="delete button"
              className="delete"
              onClick={() => setInputField('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
