import React, { useState } from 'react';
import { IQuery, SortField } from '../../types/Filter';

interface ITodoFilter {
  setQuery: React.Dispatch<React.SetStateAction<IQuery>>;
}

export const TodoFilter: React.FC<ITodoFilter> = ({ setQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as SortField;

    setQuery(prev => {
      return { ...prev, status };
    });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    setQuery(prevQuery => {
      return { ...prevQuery, query: event.target.value };
    });
  };

  const handleDeleteButton = () => {
    setQuery({ status: 'all', query: '' });
    setInputValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select onChange={handleSelect} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          onChange={handleInput}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
