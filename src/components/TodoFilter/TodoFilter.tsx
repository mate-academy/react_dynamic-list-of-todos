import { TodoStatus } from '../../types/TodoStatus';

interface Props {
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  todoStatus: TodoStatus,
  setTodoStatus: React.Dispatch<React.SetStateAction<TodoStatus>>,
}

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  todoStatus,
  setTodoStatus,
}) => {
  const handleClick = () => {
    setSearchQuery('');
  };

  const handleSetTodoStatus = (
    event :React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case 'all':
        setTodoStatus(TodoStatus.ALL);
        break;
      case 'completed':
        setTodoStatus(TodoStatus.COMPLETED);
        break;
      case 'active':
        setTodoStatus(TodoStatus.ACTIVE);
        break;

      default:
        break;
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form
      onSubmit={event => event.preventDefault()}
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoStatus}
            onChange={handleSetTodoStatus}
          >
            <option value={TodoStatus.ALL}>All</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={searchQuery}
          className="input"
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="clear search query"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
