import { TodoStatus } from '../../types/TodoStatus';

interface Props {
  onChangeStatusTodos: (choosedTodoStatus: TodoStatus) => void,
  todoStatus: TodoStatus,
  onChangeQuery: (text: string) => void,
  query: string,
}

export const TodoFilter: React.FC<Props> = ({
  onChangeStatusTodos,
  todoStatus,
  onChangeQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={todoStatus}
          onChange={(event) => (
            onChangeStatusTodos(event.target.value as TodoStatus)
          )}
        >
          <option
            value={TodoStatus.ALL}
          >
            All
          </option>
          <option
            value={TodoStatus.ACTIVE}
          >
            Active
          </option>
          <option
            value={TodoStatus.COMPLETED}
          >
            Completed
          </option>
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
        onChange={(event) => onChangeQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query.length !== 0 && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
