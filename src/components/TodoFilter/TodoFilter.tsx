import { Values } from '../../types/Values';

interface Props {
  selectedValue: string;
  onSelection: (option:Values) => void;
  query:string;
  onQuery: (text:string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  selectedValue,
  onSelection,
  query,
  onQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={selectedValue}
          onChange={(event) => {
            const values = event.target.value;

            onSelection(values as Values);
          }}
          data-cy="statusSelect"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={query}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={(event) => onQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={() => onQuery('')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
