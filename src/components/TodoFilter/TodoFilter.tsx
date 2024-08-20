import { TodoState } from '../../types/TodoState';

type Props = {
  inputQuery: string;
  setInputQuery: (query: string) => void;
  selectQuery: string;
  setSelectQuery: (query: string) => void;
};

export const TodoFilter = ({
  inputQuery,
  setInputQuery,
  selectQuery,
  setSelectQuery,
}: Props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectQuery}
          onChange={event => setSelectQuery(event.target.value)}
        >
          <option value={TodoState.ALL}>All</option>
          <option value={TodoState.ACTIVE}>Active</option>
          <option value={TodoState.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={inputQuery}
        onChange={event => setInputQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setInputQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
