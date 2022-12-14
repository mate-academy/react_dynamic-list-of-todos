import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFilteredTodos: (value: React.SetStateAction<Todo[]>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos, setFilteredTodos,
}) => {
  const [query, setQuery] = useState('');
  const [currentFilter, setcurrentFilter] = useState('all');

  const toLowerCase = query.toLowerCase();

  const filterTodo = todos
    .filter(todo => todo.title.toLowerCase()
      .includes(toLowerCase));

  const filterTodos = (filter: string) => {
    switch (filter) {
      case 'all':
        setcurrentFilter(filter);

        return todos;
      case 'active':
        setcurrentFilter(filter);

        return todos.filter(todo => !todo.completed);
      case 'completed':
        setcurrentFilter(filter);

        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  useEffect(() => setFilteredTodos(filterTodo), [todos, query]);

  // const handleAll = todos;

  // const handleActive = todos.filter(todo => !todo.completed);

  // const handleCompleted = todos.filter(todo => todo.completed);

  const Handle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const { value } = event.target;
    const filters = filterTodos(value);

    setFilteredTodos(filters);
  };

  /* const handle = () => {
    const s = () => setFilteredTodos(handleActive);
    useMemo(s, [todos]);
  }; */

  const reset = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={currentFilter}
            onChange={Handle}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => setQuery(event.target.value)}
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
            onClick={reset}
          />
        </span>
      </p>
    </form>
  );
};
