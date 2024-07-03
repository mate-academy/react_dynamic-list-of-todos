import { FC } from 'react';
import { FilterBy } from '../../types/FilterBy';
type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
  value: string;
};

export const TodoFilter: FC<Props> = ({ setQuery, setFilterBy, value }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => setFilterBy(e.target.value as FilterBy)}
          >
            {Object.keys(FilterBy).map(option => (
              <option
                value={FilterBy[option as keyof typeof FilterBy]}
                key={option}
              >
                {option}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={value}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {value && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
