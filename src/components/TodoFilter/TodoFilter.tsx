import { useState } from 'react';
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

const filteredTodoByQuery = (query: string, todos: Todo[]) => {
  return todos.filter((todo) => todo.title.includes(query));
};

const filteredTodosByInputAndStatus = (
  todos: Todo[],
  filter: Todos,
  query: string,
) => {
  const filteredByStatus = filteredTodos(todos, filter);

  return filteredTodoByQuery(query, filteredByStatus);
};

export const TodoFilter: React.FC<Props> = ({
  onUploadedTodos,
  onCurrentTodos,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Todos.All);

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as Todos;

    setFilter(newFilter);

    const newTodos = filteredTodosByInputAndStatus(
      onUploadedTodos,
      newFilter,
      query,
    );

    onCurrentTodos(newTodos);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);

    const newTodos = filteredTodosByInputAndStatus(
      onUploadedTodos,
      filter,
      newQuery,
    );

    onCurrentTodos(newTodos);
  };

  const handleReset = () => {
    setQuery('');
    setFilter(Todos.All);
    onCurrentTodos(onUploadedTodos);
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
          value={query}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
           && (
             // eslint-disable-next-line jsx-a11y/control-has-associated-label
             <button
               data-cy="clearSearchButton"
               type="button"
               className="delete"
               onClick={handleReset}
             />
           )}
        </span>
      </p>
    </form>
  );
};
