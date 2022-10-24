import { useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onVisible: (visible: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  onVisible,
}) => {
  const [sortBy, setSortBy] = useState('all');
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  // console.log(todos);
  // console.log(sortedTodos);

  useEffect(() => {
    // let sortedTodos;

    switch (sortBy) {
      case 'active':
        setSortedTodos(todos.filter(todo => todo.completed === false));

        break;
      case 'completed':
        setSortedTodos(todos.filter(todo => todo.completed === true));

        break;
      default:
        setSortedTodos([...todos]);
    }

    // sortedTodos = sortedTodos.filter(todo => {
    //   return todo.title.includes(query.toLowerCase());
    // });

    onVisible(sortedTodos);
  }, [sortBy]);

  useEffect(() => {
    setSortedTodos(sortedTodos.filter(todo => {
      return todo.title.includes(query.toLowerCase());
    }));

    onVisible(sortedTodos);
  }, [query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setSortBy('all');
              setQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
