import React, { useEffect, useState } from 'react';

type Props = {
  filteredTodos: (value: string, inputValue: string) => void;
};
export const TodoFilter: React.FC<Props> = ({ filteredTodos }) => {
  const [input, setInput] = useState('');
  const [sortBy, setSortBy] = useState('all');

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const resetInput = () => {
    setInput('');
  };

  useEffect(() => {
    filteredTodos(sortBy, input);
  }, [sortBy, input]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={handleChangeSort}
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
          value={input}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {input.length > 0 && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
