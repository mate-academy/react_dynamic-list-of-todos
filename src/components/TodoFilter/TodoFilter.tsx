import { Status } from '../../types/Status';

type Props = {
  query: string;
  setFilter: (value: Status) => void;
  setQuery: (value: string) => void;
};

const SELECT_VALUES = [Status.all, Status.active, Status.completed];

export const TodoFilter: React.FC<Props> = ({
  setFilter, setQuery, query,
}) => {
  const handleFilterChange = (event:
  React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Status);
  };

  const handleQueryChange = (event:
  React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryClear = () => {
    setQuery('');
  };

  const capitalizerFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            {SELECT_VALUES.map(value => (
              <option
                value={value}
                key={value}
              >
                {capitalizerFirstLetter(Status[value])}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="
        control
        is-expanded
        has-icons-left
        has-icons-right"
      >
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
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
