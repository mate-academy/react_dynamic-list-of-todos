import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodosToShow: (cb: (value: Todo[]) => Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({ setTodosToShow, todos }) => {
  const [filteredByComplete, setFilteredByComplete] = useState(todos);
  const [selectValue, setSelectValue] = useState('all');
  const [query, setQuery] = useState('');
  const [queryChangeTime, setQueryChangeTime] = useState(Date.now());

  useEffect(() => {
    setFilteredByComplete(() => todos);
  }, [todos]);

  useEffect(() => {
    setTodosToShow(() => filteredByComplete);
  }, [filteredByComplete]);

  const filterByCompleted = (isCompleted: string) => {
    switch (isCompleted) {
      case 'all':
        setFilteredByComplete(() => todos);

        break;
      case 'active':
        setFilteredByComplete(
          () => todos.filter((todo: Todo) => !todo.completed),
        );

        break;
      case 'completed':
        setFilteredByComplete(
          () => todos.filter((todo: Todo) => todo.completed),
        );
        break;
      default:
    }
  };

  const filterByQuery = (value: string) => {
    setTodosToShow(() => filteredByComplete
      .filter((todo: Todo) => todo.title.toLowerCase()
        .includes(value.toLowerCase())));
  };

  const onQueryChange = (value: string) => {
    if (value.length < query.length) {
      filterByQuery(value);
    }

    setQueryChangeTime(Date.now());
    setQuery(() => value);

    if (Date.now() - queryChangeTime > 1000) {
      return;
    }

    filterByQuery(value);
  };

  const onStatusChange = (value: string) => {
    setQuery('');
    setSelectValue(value);
    filterByCompleted(value);
  };

  const onCloseClick = () => {
    onQueryChange('');
    setFilteredByComplete(todos);
    setSelectValue('all');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={(e) => onStatusChange(e.target.value)}
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
          placeholder="Search..."
          onChange={e => onQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onCloseClick()}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
