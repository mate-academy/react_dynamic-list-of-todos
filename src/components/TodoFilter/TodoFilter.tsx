import React from 'react';
import { OptionType } from '../../types/OptionType';

type Props = {
  setFilterField: (optionField: OptionType) => void;
  query: string;
  setQuery: (filterField: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({ setFilterField, query, setQuery }) => {
    const handleQueryReset = () => {
      setQuery('');
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={event =>
                setFilterField(event.target.value as OptionType)
              }
            >
              {Object.values(OptionType).map(value => (
                <option value={value} key={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
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
            onChange={event => {
              setQuery(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {query && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleQueryReset}
              />
            )}
          </span>
        </p>
      </form>
    );
  },
);

TodoFilter.displayName = 'TodoFilter';
