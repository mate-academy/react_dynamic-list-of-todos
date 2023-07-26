import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TodoContext } from '../../context/todo.context';
import { TodoListStatus } from '../../services/todo.service';

export const TodoFilter = () => {
  const { handleTodosByFilter } = useContext(TodoContext);

  const [query, setQuery] = useState('');
  const [todoListStatus, setTodoListStatus]
    = useState<TodoListStatus>(TodoListStatus.All);

  useEffect(() => {
    handleTodosByFilter({ query, todoListStatus });
  }, [query, todoListStatus]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case TodoListStatus.Active:
        setTodoListStatus(TodoListStatus.Active);
        break;

      case TodoListStatus.Completed:
        setTodoListStatus(TodoListStatus.Completed);
        break;

      case TodoListStatus.All:
      default:
        setTodoListStatus(TodoListStatus.All);
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={todoListStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {
            query.length > 0 && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            )
          }
        </span>
      </p>
    </form>
  );
};
