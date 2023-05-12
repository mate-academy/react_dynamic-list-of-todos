/* eslint-disable max-len */
import { useState } from 'react';

interface Props {
  handleSearchQuery: (query: string) => void
  handleSelectQuery: (query: string) => void
}

export const TodoFilter: React.FC<Props> = ({ handleSearchQuery, handleSelectQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState('All');

  const getSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchQuery(event.target.value.toLocaleLowerCase());
    setSearchQuery(event.target.value);
  };

  const getSelectQuery = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectQuery(event.target.value);
    setSelectQuery(event.target.value);
  };

  const reset = () => {
    handleSearchQuery('');
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={selectQuery} onChange={getSelectQuery}>
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
          value={searchQuery}
          onChange={getSearchQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
