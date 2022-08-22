import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  changeFilters: (filteredTodos: Todo[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TodoFilter: React.FC<Props> = ({ todos, changeFilters }) => {
  const [querry, setQuerry] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    changeFilters(todos
      .filter(todo => todo
        .title
        .toLowerCase()
        .includes(querry.toLowerCase()))
      .filter(todo => {
        switch (status) {
          case 'all':
            return true;

          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      }));
  }, [querry, status]);

  const handleQuerryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuerry(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => handleStatusChange(event)}
          >
            <option value="all" defaultChecked>All</option>
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
          value={querry}
          onChange={event => handleQuerryChange(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {querry.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuerry('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
