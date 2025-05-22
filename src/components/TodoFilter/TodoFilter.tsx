import { useState } from 'react';
import { TodoState } from '../../types/Todo';

type TodoFilterProps = {
  styleFilter: TodoState;
  setStyleFilter: (value: TodoState) => void;
  setInputSearch: (value: string) => void;
};

export const TodoFilter = ({
  styleFilter,
  setStyleFilter,
  setInputSearch,
}: TodoFilterProps) => {
  const [input, setInput] = useState('');

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let result = TodoState.All;

    if (event.target.value === TodoState.Active) {
      result = TodoState.Active;
    }

    if (event.target.value === TodoState.Completed) {
      result = TodoState.Completed;
    }

    setStyleFilter(result);
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setInputSearch(event.target.value);
  };

  const handleInputClear = () => {
    setInput('');
    setInputSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={styleFilter}
            onChange={handleSelectionChange}
          >
            <option value={TodoState.All}>All</option>
            <option value={TodoState.Active}>Active</option>
            <option value={TodoState.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={input}
          onChange={handleInputSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {input !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
