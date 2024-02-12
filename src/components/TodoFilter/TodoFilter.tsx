import React, { useState, ChangeEvent } from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export const TodoFilter: React.FC<Props> = ({ setFilter }) => {
  const [query, setQuery] = useState('');

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({ ...prev, status: e.target.value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value.toLowerCase().trim();

    setQuery(e.target.value);
    setFilter(prev => ({ ...prev, title: inputQuery }));
  };

  const handleClick = () => {
    setQuery('');
    setFilter(prev => ({ ...prev, title: '' }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
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
          value={query}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right" style={{ cursor: 'pointer' }}>
          {!!query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClick}
            />
          )}

        </span>
      </p>
    </form>
  );
};

export default TodoFilter;
