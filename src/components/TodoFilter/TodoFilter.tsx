import { useState, FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
};

enum Selected {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: FC<Props> = ({ todos, setTodos }) => {
  const [selected, setSelected] = useState(Selected.All);
  const [query, setQuery] = useState('');

  const getTodosByCompleted = (mode: Selected) => {
    switch (mode) {
      case Selected.Active:
        return todos.filter(({ completed }) => !completed);

      case Selected.Completed:
        return todos.filter(({ completed }) => completed);

      default:
        return todos;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={(event) => {
              const mode = event.target.value as Selected;

              setSelected(mode);
              setTodos(getTodosByCompleted(mode));
            }}
          >
            <option value={Selected.All}>All</option>
            <option value={Selected.Active}>Active</option>
            <option value={Selected.Completed}>Completed</option>
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
          onChange={(event) => {
            const newQuery = event.target.value;

            setQuery(newQuery);

            if (newQuery.length > 0) {
              const newTodos = getTodosByCompleted(selected).filter(
                ({ title }) => RegExp(newQuery, 'i').test(title),
              );

              setTodos(newTodos);
            } else {
              setTodos(getTodosByCompleted(selected));
            }
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                setTodos(getTodosByCompleted(selected));
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
