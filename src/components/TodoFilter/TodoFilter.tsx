import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Proprs = {
  todos: Todo[];
  setter: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Proprs> = ({ todos, setter }) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [inputValue, setInputValue] = useState('');

  const changeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    let currentTodos = [...todos];

    if (selectedOption === 'all') {
      setter(todos);
      currentTodos = todos;
    }

    if (selectedOption === 'active') {
      const preparedTodos = todos.filter(todo => !todo.completed);

      setter(preparedTodos);
      currentTodos = preparedTodos;
    }

    if (selectedOption === 'completed') {
      const preparedTodos = todos.filter(todo => todo.completed);

      setter(preparedTodos);
      currentTodos = preparedTodos;
    }

    if (inputValue) {
      const preparedTodos = currentTodos.filter(todo =>
        todo.title.toLowerCase().includes(inputValue.toLocaleLowerCase()),
      );

      setter(preparedTodos);
    }
  }, [todos, selectedOption, inputValue]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={changeOption}
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
          value={inputValue}
          onChange={handler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
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
