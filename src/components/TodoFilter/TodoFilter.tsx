import React from 'react';
import { TodoStatus } from '../../App';

interface Props {
  query: string;
  onInput: (query: string) => void;
  onSelect: (value: TodoStatus) => void;
  setInputField: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = React.memo(
  ({ query, onInput, onSelect, setInputField }) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onInput(event.target.value);
      setInputField(event.target.value);
    };

    const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSelect(event.target.value as TodoStatus);
    };

    const handleClearButton = () => {
      setInputField('');
      onInput('');
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select data-cy="statusSelect" onChange={handleOnSelect}>
              {Object.values(TodoStatus).map((option: TodoStatus) => {
                return (
                  <option key={option} value={option}>
                    {option.slice(0, 1).toUpperCase() + option.slice(1)}
                  </option>
                );
              })}
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            value={query}
            placeholder="Search..."
            onChange={handleOnChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {query && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearButton}
              />
            )}
          </span>
        </p>
      </form>
    );
  },
);

TodoFilter.displayName = 'TodoFilter';
