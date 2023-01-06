import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setVisibleTodos: (arg0: Todo[]) => void,
  visibleTodos: Todo[]
};

export const TodoFilter: React.FC<Props> = ({
  todos, setVisibleTodos,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const filterTodosSelect = (value: boolean, input: string = inputValue) => {
    return setVisibleTodos(todos.filter((todo) => {
      return todo.completed === value && todo.title.includes(input);
    }));
  };

  const filterTodosByOption = (value: string) => {
    switch (value) {
      case 'all':
        setActive(false);
        setCompleted(false);

        return setVisibleTodos(todos.filter((todo) => {
          return todo.title.includes(inputValue);
        }));

      case 'active':
        setActive(true);
        setCompleted(false);

        return filterTodosSelect(false);

      case 'completed':
        setCompleted(true);
        setActive(false);

        return filterTodosSelect(true);

      default:
        break;
    }

    return value;
  };

  function filterByInput(event = '') {
    if (active) {
      filterTodosByOption('active');

      return filterTodosSelect(false, event);
    }

    if (completed) {
      filterTodosByOption('completed');

      return filterTodosSelect(true, event);
    }

    return setVisibleTodos(todos.filter((todo) => {
      return todo.title.includes(event);
    }));
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => filterTodosByOption(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">
              Active
            </option>
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
          value={inputValue}
          onChange={((event) => {
            setInputValue(event.target.value);
            filterByInput(event.target.value);
          })}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          inputValue
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  setInputValue('');
                  filterByInput();
                }}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
