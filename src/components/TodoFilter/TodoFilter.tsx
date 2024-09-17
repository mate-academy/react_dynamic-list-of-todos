import React, { useCallback, useState } from 'react';
import { Filters } from '../../types/Filter';

function debounce(callback: (query: string) => void, delay: number) {
  let timerId = 0;

  return (arg: string) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(arg);
    }, delay);
  };
}

type Props = {
  onSelect: (filter: Filters) => void;
  onQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onSelect = () => {},
  onQuery = () => {},
}) => {
  const [inputValue, setInputValue] = useState('');
  const applyQuery = useCallback(debounce(onQuery, 300), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setInputValue(val);
    applyQuery(val);
  };

  const handleClear = () => {
    setInputValue('');
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              onSelect(event.target.value);
            }}
          >
            <option value={Filters.all}>All</option>
            <option value={Filters.active}>Active</option>
            <option value={Filters.completed}>Completed</option>
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
          onChange={handleChange}
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
              onClick={() => handleClear()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
