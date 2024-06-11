import { Select } from '../../App';

type Props = {
  query: string;
  onChange: (value: string) => void;
  select: Select;
  onSelect: (value: Select) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChange,
  select,
  onSelect,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={e => onSelect(e.target.value as Select)}
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
          onChange={event => onChange(event.target.value)}
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
              onClick={() => onChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
