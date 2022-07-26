import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  onSettingTodo: React.Dispatch<React.SetStateAction<Todo[]>>,
}

export const TodoFilter: React.FC<Props> = ({ todos, onSettingTodo }) => {
  const [query, setQuery] = useState('');
  const lowerQuery = query.toLowerCase();

  useEffect(() => {
    onSettingTodo(todos
      .filter(todo => todo.title.toLowerCase()
        .includes(lowerQuery)));
  }, [lowerQuery]);

  const handleOnSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    switch (true) {
      case (target.value === 'all'):
        onSettingTodo(todos);
        break;

      case (target.value === 'completed'):
        onSettingTodo(todos.filter(todo => todo.completed === true));
        break;

      case (target.value === 'active'):
        onSettingTodo(todos.filter(todo => todo.completed === false));
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleOnSelect}
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
          value={query}
          onChange={({ target }) => setQuery(target.value)}
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
            onClick={() => {
              onSettingTodo(todos);
              setQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
