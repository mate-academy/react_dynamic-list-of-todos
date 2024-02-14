import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todosFromServer: Todo[];
  setFiltredTodos: (v: Todo[]) => void;
};
export const TodoFilter: React.FC<Props> = ({
  todosFromServer,
  setFiltredTodos,
}) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('all');

  const switchFilter = (value: string) => {
    let filtredTodoss: Todo[] = [];

    switch (value) {
      case 'active':
        filtredTodoss = todosFromServer.filter((todo) => (
          todo.completed === false
        ));

        break;

      case 'completed':
        filtredTodoss = todosFromServer.filter((todo) => todo.completed);
        break;

      case 'all':
        filtredTodoss = todosFromServer;
        break;

      default:
        break;
    }

    return filtredTodoss;
  };

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setStatus(value);
    const switchTodos = switchFilter(value);

    if (inputValue !== '') {
      const searchTodos = switchTodos.filter((todo) => (
        todo.title.toLowerCase().includes(inputValue.toLowerCase())
      ));

      setFiltredTodos(searchTodos);
    } else {
      setFiltredTodos(switchTodos);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);

    const statusTodos = switchFilter(status);
    const searchTodos = statusTodos.filter((todo) => (
      todo.title.toLowerCase().includes(value.toLowerCase())
    ));

    setFiltredTodos(searchTodos);
  };

  const handleSearchClear = () => {
    setInputValue('');
    const statusTodos = switchFilter(status);

    setFiltredTodos(statusTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => handleOption(e)}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
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
          value={inputValue}
          placeholder="Search..."
          onChange={(e) => handleSearch(e)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <>
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleSearchClear}
              />
            </span>
          </>
        )}
      </p>
    </form>
  );
};
