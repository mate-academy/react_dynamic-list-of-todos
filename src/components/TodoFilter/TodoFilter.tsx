import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  allTodos: Todo[];
  onSetTodos: (allTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({
  allTodos,
  onSetTodos,
}) => {
  const [completed, setCompleted] = useState('all');
  const [query, setQuery] = useState('');

  const filterCallbackByCompleted
  = (todoStatus: boolean, selectedStatus: string) => {
    switch (selectedStatus) {
      case 'active':
        return !todoStatus;
      case 'completed':
        return todoStatus;
      default:
        return true;
    }
  };

  const filterCallbackByTitle = (title: string, str: string) => {
    return title.toLowerCase().includes(str.trim().toLowerCase());
  };

  const setVisibleTodos = (str: string, selectedStatus: string) => {
    onSetTodos(allTodos
      .filter(todo => filterCallbackByCompleted(todo.completed, selectedStatus))
      .filter(todo => filterCallbackByTitle(todo.title, str)));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentStatus = event.target.value;

    setCompleted(currentStatus);
    setVisibleTodos(query, currentStatus);
  };

  const handleQueryChange = (queryValue:string) => {
    setQuery(queryValue);
    setVisibleTodos(queryValue, completed);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completed}
            onChange={handleSelect}
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
          onChange={(e) => handleQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
