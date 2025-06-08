import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  originTodos: Todo[];
  setTodoList: (value: Todo[]) => void;
}

const prepareTodoList = (
  originTodos: Todo[],
  filterParam: string,
  query: string,
) => {
  let copy = [...originTodos];

  copy = copy.filter(({ completed }) => {
    switch (filterParam) {
      case 'active':
        return !completed;
      case 'completed':
        return completed;
      default:
        return true;
    }
  });

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    copy = copy.filter(({ title }) =>
      title.toLowerCase().includes(normalizedQuery),
    );
  }

  return copy;
};

export const TodoFilter: React.FC<Props> = ({ originTodos, setTodoList }) => {
  const [query, setQuery] = useState('');
  const [filterParam, setFilterParam] = useState('all');

  useEffect(() => {
    setTodoList(prepareTodoList(originTodos, filterParam, query));
  }, [originTodos, query, filterParam, setTodoList]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterParam}
            onChange={event => setFilterParam(event.target.value)}
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
          onChange={event => setQuery(event.target.value.trimStart())}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
