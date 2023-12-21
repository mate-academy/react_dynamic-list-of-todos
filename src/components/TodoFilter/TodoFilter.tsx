import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  setTodos: (todos: Todo[] | null) => void;
};

export const TodoFilter = ({ todos, setTodos }: Props) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value;

    if (todos) {
      let filteredTodos = [...todos];

      switch (filter) {
        case 'all':
          filteredTodos = [...todos];
          break;
        case 'completed':
          filteredTodos = filteredTodos.filter((todo) => todo.completed);
          break;
        case 'active':
          filteredTodos = filteredTodos.filter((todo) => !todo.completed);
          break;
        default:
          break;
      }

      setTodos(filteredTodos);
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            <option
              value="all"
            >
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
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
