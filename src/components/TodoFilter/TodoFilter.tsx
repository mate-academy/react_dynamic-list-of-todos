import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[],
};

export const TodoFilter: React.FC<Props> = ({ setTodos, todos }) => {
  const [value, setValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let filteredTodos = todos;

    filteredTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    switch (value) {
      case 'active':
        filteredTodos = todos.filter(todo => {
          if (searchValue) {
            return !todo.completed
              && todo.title.toLowerCase().includes(searchValue.toLowerCase());
          }

          return !todo.completed;
        });
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => {
          if (searchValue) {
            return todo.completed
              && todo.title.toLowerCase().includes(searchValue.toLowerCase());
          }

          return todo.completed;
        });
        break;

      default:
        filteredTodos = todos.filter(todo => {
          if (searchValue) {
            return todo.title.includes(searchValue);
          }

          return todo;
        });
        break;
    }

    setTodos(filteredTodos);
  }, [value, searchValue, setTodos, todos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setValue(event.target.value)}
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
          placeholder="Search..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setSearchValue('')}
              />
            </span>
          )}

      </p>
    </form>
  );
};
