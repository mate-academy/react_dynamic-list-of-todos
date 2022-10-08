import { useState } from 'react';

type Todos = {
  filterTodos: (selectValue: string, inputValue: string) => void;
};

export const TodoFilter: React.FC<Todos> = ({ filterTodos }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  const handleSearch = (value: string, name: string) => {
    if (name === 'search') {
      setInputValue(value);
      filterTodos(selectValue, value);
    }

    if (name === 'select') {
      setSelectValue(value);
      filterTodos(value, inputValue);
    }
  };

  const clearState = () => {
    setInputValue('');
    filterTodos('all', '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="select"
            onChange={(e) => {
              handleSearch(e.target.value, e.target.name);
            }}
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
          name="search"
          value={inputValue}
          onChange={(e) => {
            handleSearch(e.target.value, e.target.name);
          }}
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
              onClick={() => {
                clearState();
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
