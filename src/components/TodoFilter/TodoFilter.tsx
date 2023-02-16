import { FilterType } from '../../types/FilterType';

type Props = {
  onFilter: (type: FilterType) => void;
  query: string;
  onQuery: (event: string) => void;
  onApplyQuery: (event: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilter,
  query,
  onQuery,
  onApplyQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => {
            onFilter(event.target.value as FilterType);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
        onChange={(event) => {
          onQuery(event.target.value);
          onApplyQuery(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onQuery('');
            }}
            aria-label="close modal"
          />
        )}
      </span>
    </p>
  </form>
);
