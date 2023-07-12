import { Select } from '../../types/Select';

type Props = {
  query: string;
  status: Select;
  handleSelect: (value: Select) => void;
  handleInput: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query, status, handleSelect, handleInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          name="status"
          value={status}
          onChange={(event) => handleSelect(event.target.value as Select)}
        >
          <option value={Select.ALL}>All</option>
          <option value={Select.ACTIVE}>Active</option>
          <option value={Select.COMLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        name="query"
        value={query}
        onChange={(event) => handleInput(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleInput('')}
          />
        )}
      </span>
    </p>
  </form>
);
