import { StatusFilterValue } from '../../types/Todo';
import './TodoFilter.scss';

interface Props {
  onStatusSelected: (value: StatusFilterValue) => void;
  statusFilter: StatusFilterValue;
  onQueryChange: (value: string) => void;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  onStatusSelected,
  statusFilter,
  onQueryChange,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={e => onStatusSelected(e.target.value as StatusFilterValue)}
        >
          {Object.values(StatusFilterValue).map(value => (
            <option value={value} key={value}>
              {`${value[0].toUpperCase()}${value.slice(1)}`}
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
        onChange={e => onQueryChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right clear-button">
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
