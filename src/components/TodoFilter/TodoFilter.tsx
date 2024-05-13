import React, { FC, useState } from 'react';
import { IQuery } from '../../App';
import { StatusSelect } from '../../types/Todo';

interface ITodoFilter {
  setQuery: React.Dispatch<React.SetStateAction<IQuery>>;
}

export const TodoFilter: FC<ITodoFilter> = ({ setQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as StatusSelect;

    setQuery(prevQuery => {
      return { ...prevQuery, status };
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
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
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
          value={inputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right">
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
