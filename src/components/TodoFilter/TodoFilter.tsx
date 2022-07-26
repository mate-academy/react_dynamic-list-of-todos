import React, { useState } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  chooseFilteredType: (filterType: string) => void,
  changeQuery: (input: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  chooseFilteredType,
  changeQuery,
}) => {
  const [query, setQuery] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    chooseFilteredType(event.target.value);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleSelectChange(event)}
          >
            <option value={Filter.ALL}>
              All
            </option>
            <option value={Filter.ACTIVE}>
              Active
            </option>
            <option value={Filter.COMPLETED}>
              Completed
            </option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              changeQuery('');
              setQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
