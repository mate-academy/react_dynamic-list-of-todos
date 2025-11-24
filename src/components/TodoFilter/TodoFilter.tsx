import React, { useState } from 'react';

type Props = {
  onSelect: (select: string) => void;
  onQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ onSelect, onQuery }) => {
  const [selectTodos, setSelectTodos] = useState('all');
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const select = changeEvent.target.value;

    onSelect(select);

    setSelectTodos(select);
  };

  const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const text = changeEvent.target.value;

    setInputValue(text);
    onQuery(text);
  };

  const clearQuery = () => {
    setInputValue('');
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectTodos}
            onChange={handleSelect}
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
          value={inputValue}
          onChange={handleChange}
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
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
