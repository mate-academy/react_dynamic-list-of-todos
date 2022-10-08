import { FC, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setSortedTodos: (todo: Todo[]) => void;
}

export const TodoFilter: FC<Props> = ({
  setSortedTodos,
  todos,
}) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('all');

  const isIncludes = (title: string) => {
    return title.toLowerCase().includes(search);
  };

  const filter = () => {
    switch (sortBy) {
      case 'active':
        setSortedTodos(todos.filter(todo => !todo.completed
          && isIncludes(todo.title)));
        break;
      case 'completed':
        setSortedTodos(todos.filter(todo => todo.completed
          && isIncludes(todo.title)));
        break;
      default: setSortedTodos(todos
        .filter(todo => isIncludes(todo.title)));
    }
  };

  useEffect(() => {
    filter();
  }, [search, sortBy]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              setSortBy(event.target.value);
            }}
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
          value={search}
          onChange={event => {
            setSearch(event.target.value.toLowerCase());
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {search
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setSearch('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
