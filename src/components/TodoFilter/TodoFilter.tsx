import debounce from 'lodash/debounce';
import { useState, useCallback } from 'react';
import { FilterType } from '../../utils/filter';

type Props = {
  query: string,
  onChangeQuery: (newQuery: string) => void,
  onChangeType: (newType: FilterType) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  onChangeType,
}) => {
  const [tempQuery, setTempQuery] = useState('');

  const applyQuery = useCallback(
    debounce(onChangeQuery, 500),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTempQuery(event.target.value);

    applyQuery(event.target.value.trim().toLowerCase());
  };

  const clearSearch = () => {
    setTempQuery('');
    onChangeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => onChangeType(event.target.value as FilterType)}
          >
            {Object.values(FilterType).map((filterType) => (
              <option key={filterType} value={filterType}>
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
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
          value={tempQuery}
          onChange={handleQueryChange}
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
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
