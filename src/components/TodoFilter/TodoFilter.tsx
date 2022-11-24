import React, { useState } from 'react';
import { getActiveTodos, getCompletedTodos, getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  changeQuery: (value: string) => void,
  handleChangeTodos: (value: Promise<Todo[]>) => void,
};

export const TodoFilter: React.FC<Props> = ({
  changeQuery,
  handleChangeTodos,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const changeSearchValue = (value: string) => {
    changeQuery(value);
    setSearchValue(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              switch (event.target.value) {
                case 'active':
                  return handleChangeTodos(getActiveTodos());
                case 'completed':
                  return handleChangeTodos(getCompletedTodos());
                default:
                  return handleChangeTodos(getTodos());
              }
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
          value={searchValue}
          onChange={(event) => changeSearchValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeSearchValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
