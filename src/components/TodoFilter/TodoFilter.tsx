import React, { useState } from 'react';
import { SelectTodos } from '../../types/Select';

type Props = {
  onSelect: (query: SelectTodos) => void;
  onInput: (query: string) => void;
};

const TodoFilter: React.FC<Props> = ({ onSelect, onInput }) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as SelectTodos);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    onInput(event.target.value.toLowerCase());
  };

  const reset = () => {
    setInputQuery('');
    onInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
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
          value={inputQuery}
          onChange={handleInput}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputQuery.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          </span>
        )}
      </p>
    </form>
  );
};

export const MemoTodoFilter = React.memo(TodoFilter);
