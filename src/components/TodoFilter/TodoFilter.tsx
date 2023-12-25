import { useState } from 'react';
import { Filters } from '../../libs/enums';

type Props = {
  onSelectFilter: (filter: Filters) => void;
  onEnterQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onSelectFilter,
  onEnterQuery,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(Filters.All);
  const [query, setQuery] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as Filters;

    setSelectedFilter(selected);
    onSelectFilter(selected);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredQuery = event.target.value;

    setQuery(enteredQuery);
    onEnterQuery(enteredQuery);
  };

  const handleQueryClear = () => {
    setQuery('');
    onEnterQuery('');
  };

  const options = Object.entries(Filters).map(([key, value]) => (
    <option key={value} value={value}>
      {key}
    </option>
  ));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            {options}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
