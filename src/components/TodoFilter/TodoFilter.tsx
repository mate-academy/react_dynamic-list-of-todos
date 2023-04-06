import { Todo } from '../../types/Todo';

interface Props {
  onUploadedTodos: Todo[];
  onCurrentTodos: (todos: Todo[]) => void;
}

enum Todos {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed ',
}

const filteredTodos = (todos: Todo[], filter: Todos) => {
  switch (filter) {
    case Todos.Active:
      return todos.filter((todo) => !todo.completed);
    case Todos.Completed:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const TodoFilter: React.FC<Props> = ({
  onUploadedTodos,
  onCurrentTodos,
}) => {
  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentTodos = filteredTodos(
      onUploadedTodos,
      event.target.value as Todos,
    );

    onCurrentTodos(currentTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelect}>
            <option value={Todos.All}>All</option>
            <option value={Todos.Active}>Active</option>
            <option value={Todos.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
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
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
