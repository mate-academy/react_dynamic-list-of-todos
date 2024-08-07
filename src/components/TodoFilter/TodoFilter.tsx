import React from 'react';
import { Options } from '../../types/Options';

type Props = {
  query: string;
  select: Options;
  setQuery: (query: string) => void;
  setSelect: (select: Options) => void;
};

export const TodoFilter: React.FC<Props> = ({
  select,
  query,
  setQuery = () => {},
  setSelect = () => {},
}) => {
  const heandleOptionsChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelect(event.target.value as Options);
  };

  const heandleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={heandleOptionsChange}
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
          onChange={heandleSearchChange}
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
