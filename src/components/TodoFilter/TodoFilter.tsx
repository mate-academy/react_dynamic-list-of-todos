import { ChangeEvent, FC, useState } from 'react';
import { Todo } from '../../types/Todo';

interface IPros {
  todos: Todo[];
  setFilterTodos: (filteredTodos: Todo[]) => void;
}

export const TodoFilter: FC<IPros> = ({ todos, setFilterTodos }) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');

  const filterTodos = (option: string, inputValue: string) => {
    let filteredTodos = todos;

    if (option !== 'all') {
      filteredTodos = filteredTodos.filter(todo =>
        option === 'active' ? !todo.completed : todo.completed,
      );
    }

    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
    );

    setFilterTodos(filteredTodos);
  };

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);

    filterTodos(selectedValue, query);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setQuery(inputValue);

    filterTodos(selectedOption, inputValue);
  };

  const clearButton = () => {
    setQuery('');
    filterTodos(selectedOption, '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleOptionChange}>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
