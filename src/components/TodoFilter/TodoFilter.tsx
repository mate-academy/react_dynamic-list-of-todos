import { FilterType } from '../../types/FilterType';

interface Props {
  queryParam: string,
  onInputChange: (value: string) => void,
  onSelectCategory: (category: FilterType) => void,
}

export const TodoFilter: React.FC<Props> = ({
  queryParam,
  onInputChange,
  onSelectCategory,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => (
            onSelectCategory(event.target.value as FilterType)
          )}
        >
          {Object.entries(FilterType).map(([key, filterType]) => (
            <option key={filterType} value={filterType}>
              {key}
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
        value={queryParam}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onInputChange(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {queryParam && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Button icon"
            onClick={() => onInputChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
