import React from 'react';
import { SelectCategory } from '../../types/SelectCategory';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  setSelectCategory: (value: SelectCategory) => void;
};

export const TodoFilter: React.FC<Props> = props => {
  const { query, setQuery, setSelectCategory } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(event.target.value as SelectCategory);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChange}>
            <option value={SelectCategory.all}>All</option>
            <option value={SelectCategory.active}>Active</option>
            <option value={SelectCategory.completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
            onClick={() => setQuery('')}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
