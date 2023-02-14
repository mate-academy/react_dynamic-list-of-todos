import { useState } from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setVisibleTodos: (todos: Todo[]) => void,
  visibleTodos: Todo[]
};
let filteredTodos = [];

export const TodoFilter: React.FC<Props> = ({ todos, setVisibleTodos }) => {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const filterTodosSelect = (value: boolean, input: string = inputValue) => {
    filteredTodos = todos.filter((todo) => {
      return todo.completed
      === value && todo.title.toLowerCase().includes(input.toLowerCase());
    });

    return setVisibleTodos(filteredTodos);
  };

  const filterTodosByOption = (value: string) => {
    switch (value) {
      case FilterType.all:
        setIsActive(false);
        setIsCompleted(false);

        filteredTodos = todos.filter((todo) => {
          return todo.title.toLowerCase().includes(inputValue.toLowerCase());
        });

        return setVisibleTodos(filteredTodos);

      case FilterType.active:
        setIsActive(true);
        setIsCompleted(false);

        return filterTodosSelect(false);

      case FilterType.completed:
        setIsCompleted(true);
        setIsActive(false);

        return filterTodosSelect(true);

      default:
        break;
    }

    return value;
  };

  function filterByInput(event = '') {
    if (isActive) {
      filterTodosByOption(FilterType.active);

      return filterTodosSelect(false, event);
    }

    if (isCompleted) {
      filterTodosByOption(FilterType.completed);

      return filterTodosSelect(true, event);
    }

    return setVisibleTodos(todos.filter((todo) => {
      return todo.title.toLowerCase().includes(event.toLowerCase());
    }));
  }

  const filterTodosByInput = (value: string) => {
    setInputValue(value);
    filterByInput(value);
  };

  const clearInput = () => {
    setInputValue('');
    filterByInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => filterTodosByOption(event.target.value)}
          >
            <option value={FilterType.all}>All</option>
            <option value={FilterType.active}>
              Active
            </option>
            <option value={FilterType.completed}>Completed</option>
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
          onChange={(event) => filterTodosByInput(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="Clear input"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
