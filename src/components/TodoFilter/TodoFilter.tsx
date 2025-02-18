import { FILTER } from '../../App';

type Props = {
  setCompleteStatus: (status: string) => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setCompleteStatus,
  setSearchInput,
  searchInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={e => setCompleteStatus(e.target.value)}
            data-cy="statusSelect"
          >
            <option value={FILTER.all}>All</option>
            <option value={FILTER.active}>Active</option>
            <option value={FILTER.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
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
          {searchInput !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
