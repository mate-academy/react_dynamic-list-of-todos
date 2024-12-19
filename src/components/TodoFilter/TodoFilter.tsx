import React, { Dispatch, SetStateAction } from 'react';
import { Filters } from '../../types/Filters';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<Filters>>;
};

const makeStrCapitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const TodoFilter: React.FC<Props> = props => {
  const { query, setQuery, setStatus } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={evt => setStatus(evt.target.value as Filters)}
          >
            {Object.values(Filters).map(value => {
              return (
                <option key={value} value={value}>
                  {makeStrCapitalize(value)}
                </option>
              );
            })}
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
          onChange={evt => setQuery(evt.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
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
