import React, { FC } from 'react';

type Props = {
  category: string;
  handleChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  query: string;
  handleChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
};

export const TodoFilter: FC<Props> = ({
  category,
  handleChangeCategory,
  query,
  handleChangeQuery,
  resetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={category}
          onChange={handleChangeCategory}
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
        onChange={handleChangeQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query.length > 0 && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={resetQuery}
          />
        )}
      </span>
    </p>
  </form>
);
