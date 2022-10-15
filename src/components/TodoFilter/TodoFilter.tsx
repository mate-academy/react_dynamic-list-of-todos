import { useState } from 'react';

type Todos = {
  filterTodos: (selectValue: string, inputValue: string) => void;
};

export const TodoFilter: React.FC<Todos> = ({ filterTodos }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  const handlerFilter = (
    e: React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, nodeName } = e.target;

    switch (nodeName) {
      case 'INPUT':
        setInputValue(value);
        filterTodos(selectValue, value);
        break;

      case 'SELECT':
        setSelectValue(value);
        filterTodos(value, inputValue);
        break;

      default:
        break;
    }
  };

  const clearState = () => {
    setInputValue('');
    filterTodos('all', '');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="select"
            onChange={handlerFilter}
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
          onChange={handlerFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                clearState();
              }}
            >
              &nbsp
            </button>
          </span>
        )}
      </p>
    </form>
  );
};
