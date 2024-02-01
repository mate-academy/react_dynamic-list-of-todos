import React, { ChangeEvent, useState } from 'react';
import { FilterField } from '../../types/FilterField';

type Props = {
  setFilterField: React.Dispatch<React.SetStateAction<FilterField>>;
};

export const TodoFilter: React.FC<Props> = ({ setFilterField }) => {
  const [query, setQuery] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterField(prev => ({ ...prev, status: event.target.value }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = event.target.value.toLowerCase().trim();

    setQuery(event.target.value);
    setFilterField(prev => ({ ...prev, title: inputQuery }));
  };

  const handleReset = () => {
    setQuery('');
    setFilterField(prev => ({ ...prev, title: '' }));
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
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
