import { Sorttype } from '../../types/Sorttype';

interface Props {
  sortType: string,
  setSortType: (value: string) => void,
  query: string,
  setQuery: (value: string) => void,
}

export const TodoFilter: React.FC<Props> = ({
  sortType,
  setSortType,
  query,
  setQuery,

}) => {
  return (

    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="all">{Sorttype.all}</option>
            <option value="active">{Sorttype.active}</option>
            <option value="completed">{Sorttype.completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
