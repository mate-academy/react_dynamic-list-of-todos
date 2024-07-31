import { TodoStatus } from '../../types/Select';

type Props = {
  query: string;
  select: string;
  onSelect: (string: TodoStatus) => void;
  onQueryChange: (query: string) => void;
  clearInput: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  select,
  onSelect,
  onQueryChange,
  clearInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={select}
          onChange={e => {
            const value = e.target.value as TodoStatus;

            if (Object.values(TodoStatus).includes(value as TodoStatus)) {
              onSelect(value);
            }
          }}
          data-cy="statusSelect"
        >
          <option value="all">{TodoStatus.All}</option>
          <option value="active">{TodoStatus.Active}</option>
          <option value="completed">{TodoStatus.Completed}</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        onChange={event => onQueryChange(event.target.value)}
        value={query}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            onClick={clearInput}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
