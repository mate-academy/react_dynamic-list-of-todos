import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../../utils/filter';

type Prop = {
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

export const TodoFilter: React.FC<Prop> = ({ setFilteredTodos, todos }) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('');

  useEffect(() => {
    const filteredTodos: Todo[] = filterTodos(searchWord, selectValue, todos);

    setFilteredTodos(filteredTodos);
    // eslint-disable-next-line
  }, [searchWord, todos, selectValue]);

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchWord('');
    setFilteredTodos(todos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleFilterSelect}
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
          value={searchWord}
          onChange={handleFilterInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchWord && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
