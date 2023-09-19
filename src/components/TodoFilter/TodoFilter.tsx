import { FilterType } from '../../types/FilterType';

interface Props {
  query: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  onSearch,
  query,
  onTypeChange,
  onReset,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          defaultValue={FilterType.All}
          onChange={onTypeChange}
        >
          {Object.values(FilterType).map(type => (
            <option
              value={type}
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
        className="input"
        placeholder="Search..."
        value={query}
        onChange={onSearch}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {Boolean(query) && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onReset}
          />
        </span>
      )}
    </p>
  </form>
);
