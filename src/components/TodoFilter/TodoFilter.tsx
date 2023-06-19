import { ChangeEvent, useState } from 'react';

type Props = {
  setFilter: (todos: string) => void,
  setSearchQuery: (query: string) => void,
  searchQuery: string,
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  setSearchQuery,
  searchQuery,
}) => {
  const [isClearButtonVisible, setIsClearButtonVisible] = useState(false);
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleQueryInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsClearButtonVisible(event.target.value.trim() !== '');
  };

  const cleanQueryInput = () => {
    setSearchQuery('');
    setIsClearButtonVisible(false);
  };

  return (
    (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={handleFilterChange}
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
            value={searchQuery}
            onChange={handleQueryInput}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {isClearButtonVisible && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={cleanQueryInput}
              />
            </span>
          )}
        </p>
      </form>
    )
  );
};
