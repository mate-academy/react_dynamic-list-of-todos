import { FILTEREDBY } from '../../types/SortedBy';

interface Props {
  setQuery: (text: string) => void,
  query: string,
  setFilterBy: (type: string) => void,
  filterBy: string,
}

export const TodoFilter: React.FC<Props> = ({
  setQuery,
  query,
  setFilterBy,
  filterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          {Object.keys(FILTEREDBY).map(type => (
            <option
              value={FILTEREDBY[type as keyof typeof FILTEREDBY]}
              key={type}
            >
              {type}
            </option>
          ))}
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        value={query}
        className="input"
        placeholder="Search..."
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
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
