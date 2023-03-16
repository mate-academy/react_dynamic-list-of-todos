import React from 'react';

type Props = {
  filteredByQuery: string,
  handleFoundData: (value: string) => void,
  handleFilteredData: (value: string) => void,
  handleClearedQuery: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filteredByQuery,
  handleFoundData,
  handleFilteredData,
  handleClearedQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleFilteredData(event.target.value)}
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
          value={filteredByQuery}
          onChange={(event) => handleFoundData(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filteredByQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearedQuery}
            >
              <></>
            </button>
          </span>
        )}

      </p>
    </form>
  );
};
