import { FieldType } from '../../types/enum';

type Props = {
  selectFilter: string;
  query: string;
  setSelectFilter: (value: FieldType) => void;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectFilter,
  query,
  setQuery,
  setSelectFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => setSelectFilter(e.target.value as FieldType)}
          value={selectFilter}
        >
          {[FieldType.all, FieldType.active, FieldType.completed].map(opt => (
            <option value={opt.toLowerCase()} key={opt}>
              {opt}
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
        onChange={e => setQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
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
