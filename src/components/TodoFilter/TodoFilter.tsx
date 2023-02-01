import { FC } from 'react';

type Props = {
  handleSetQuery: (query: string) => void,
  queryValue: string,
};

export const TodoFilter: FC<Props> = ({
  handleSetQuery,
  queryValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect">
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
        value={queryValue}
        onChange={(event) => handleSetQuery(
          event.target.value.trim(),
        )}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {queryValue && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              handleSetQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
