import {
  ChangeEvent,
  useState,
  FC,
  useEffect,
} from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
};

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: FC<Props> = ({ todos, setTodos }) => {
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');

  const getTodosByStatus = (newStatus: Status) => {
    switch (newStatus) {
      case Status.Active:
        return todos.filter(({ completed }) => !completed);

      case Status.Completed:
        return todos.filter(({ completed }) => completed);

      default:
        return todos;
    }
  };

  const currentTodos = getTodosByStatus(status);

  const handleStatus = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = event.target.value as Status;

    setStatus(newStatus);
    setTodos(getTodosByStatus(newStatus));
  };

  const onClear = () => {
    setQuery('');
    setTodos(currentTodos);
  };

  useEffect(() => {
    if (query.length) {
      const newTodos = currentTodos.filter(
        ({ title }) => RegExp(query, 'i').test(title),
      );

      setTodos(newTodos);

      return;
    }

    onClear();
  }, [query, status]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatus}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          {query.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
