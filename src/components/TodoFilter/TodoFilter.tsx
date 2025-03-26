import { TodoStyles } from '../TodoStyles';

type Props = {
  onSelect: (value: string) => void;
  onInput: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ onSelect, onInput, query }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSelect(event.target.value)}
        >
          <option value={TodoStyles.ALL}>All</option>
          <option value={TodoStyles.ACTIVE}>Active</option>
          <option value={TodoStyles.COMPLETED}>Completed</option>
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
        onChange={event => onInput(event.target.value)}
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
            onClick={() => onInput('')}
          />
        </span>
      )}
    </p>
  </form>
);
