import { useState } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  filter: Filter | string,
  onFilter: (React.Dispatch<React.SetStateAction<Filter | string>>)
};

export const TodoFilter: React.FC<Props> = ({
  onSearchQuery,
  filter,
  onFilter,
}) => {
  const [query, setQuery] = useState('');

  const handleInput = (value: string) => {
    setQuery(value);
    onSearchQuery(value);
  };

  const handleClearButton = () => {
    setQuery('');
    onSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={event => onFilter(event.target.value)}
          >
            <option value="all">{Filter.all}</option>
            <option value="active">{Filter.active}</option>
            <option value="completed">{Filter.completed}</option>
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
          onChange={event => handleInput(event.target.value)}

        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="Clear Button"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleClearButton()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
