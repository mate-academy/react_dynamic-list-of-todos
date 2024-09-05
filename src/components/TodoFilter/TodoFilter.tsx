import { GroupStatusTypes } from '../../types/TextField';

interface TodoFilterProps {
  textInput: string;
  setTextInput: (input: string) => void;
  filteredStatus: GroupStatusTypes;
  setFilteredStatus: (status: GroupStatusTypes) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  textInput,
  setTextInput,
  filteredStatus,
  setFilteredStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filteredStatus}
          onChange={event =>
            setFilteredStatus(event.target.value as GroupStatusTypes)
          }
        >
          <option value={GroupStatusTypes.ALL}>All</option>
          <option value={GroupStatusTypes.ACTIVE}>Active</option>
          <option value={GroupStatusTypes.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={textInput}
        onChange={event => setTextInput(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {textInput && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setTextInput('')}
          />
        )}
      </span>
    </p>
  </form>
);
