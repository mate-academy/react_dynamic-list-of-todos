import React from 'react';
import { Option } from '../../types/Option';

type Props = {
  option: Option
  query: string
  setOption: (val: Option) => void
  setQuery: (val: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  setOption,
  option,
  query,
  setQuery,
}) => {
  const handleChooseOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value as Option);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChooseOption}
            value={option}
          >
            <option
              value={Option.ALL}
            >
              All
            </option>
            <option
              value={Option.ACTIVE}
            >
              Active
            </option>

            <option
              value={Option.COMPLETED}
            >
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
