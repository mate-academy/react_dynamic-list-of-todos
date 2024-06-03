import React from 'react';
import { Filters } from '../../App';

interface Props {
  value: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
}

export const TodoFilter: React.FC<Props> = ({ setFilter, setQuery, value }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilter(event.target.value as Filters)}
          >
            {Object.values(Filters).map(val => (
              <option key={val} value={val}>
                {val}
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
          value={value}
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {value && (
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
