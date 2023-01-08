import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setVisibleTodos: (arg0: Todo[]) => void,
  visibleTodos: Todo[]
};

enum FilterType {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({ todos, setVisibleTodos }) => {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const filterTodosSelect = (value: boolean, input: string = inputValue) => {
    return setVisibleTodos(todos.filter((todo) => {
      return todo.completed === value && todo.title.includes(input);
    }));
  };

  const filterTodosByOption = (value: string) => {
    switch (value) {
      case FilterType.all:
        setIsActive(false);
        setIsCompleted(false);

        return setVisibleTodos(todos.filter((todo) => {
          return todo.title.includes(inputValue);
        }));

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
      filterTodosByOption('active');

      return filterTodosSelect(false, event);
    }

    if (isCompleted) {
      filterTodosByOption('completed');

      return filterTodosSelect(true, event);
    }

    return setVisibleTodos(todos.filter((todo) => {
      return todo.title.includes(event);
    }));
  }

  const filterTodosByInput = ({ target: { value } }: any) => {
    setInputValue(value);
    filterByInput(value);
  };

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
          onChange={filterTodosByInput}
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
              onClick={filterTodosByInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
