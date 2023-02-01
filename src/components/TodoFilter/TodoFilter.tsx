import { FC } from 'react';

enum SelectOption {
  All,
  Active,
  Completed,
}

type Props = {
  query: string,
  handleSetFilter: (query: string) => void,
  handleSetQuery: (query: string) => void,
};

export const TodoFilter: FC<Props> = ({
  query,
  handleSetFilter,
  handleSetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => handleSetFilter(
            event.target.value,
          )}
        >
          {Object.values(SelectOption)
            .filter(value => typeof value === 'string')
            .map((option, i) => (
              <option
                key={option}
                value={SelectOption[i].toLowerCase()}
              >
                {option}
              </option>
            ))}
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
        onChange={(event) => handleSetQuery(
          event.target.value.trim(),
        )}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
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
