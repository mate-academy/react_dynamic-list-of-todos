import { SortType } from '../../types/SortType';

type Props = {
  query: string,
  onQuery: (event: React.ChangeEvent<HTMLInputElement>) => void
  onResetQuery: () => void,
  selectedSortType: SortType,
  handleSelectFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQuery = () => { },
  onResetQuery = () => { },
  selectedSortType,
  handleSelectFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedSortType}
            onChange={handleSelectFilter}
          >
            {Object.values(SortType).map((selectedType) => (
              <option key={selectedType} value={selectedType}>
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
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
          onChange={onQuery}
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
              onClick={onResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
