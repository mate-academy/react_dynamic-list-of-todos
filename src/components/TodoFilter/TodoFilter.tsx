import { ChangeEvent, useEffect, useState } from 'react';
import { useTodo } from '../../context/TodoContext';

export const TodoFilter = () => {
  const {  todos, setFilteredTodos } = useTodo();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    let filteredTodos = todos;

    if (filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (searchValue.trim() !== '') {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    setFilteredTodos(filteredTodos);
  }, [todos, filter, searchValue, setFilteredTodos]);

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'active' | 'completed');
  };

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleButtonDelete = () => {
    setSearchValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          value={searchValue}
          onChange={handleInputSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchValue === '' ? null : (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleButtonDelete}
            />
          )}
        </span>
      </p>
    </form>
  );
};
