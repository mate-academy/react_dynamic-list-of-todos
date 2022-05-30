import React, { useCallback, useEffect, useState } from 'react';
import './TodoList.scss';

import classNames from 'classnames';
import { Todo } from '../../types/todo';

type SelectUser = (userId: number) => void;

type Props = {
  todos: Todo[];
  selectedUserId: number;
  onSelectUser: SelectUser;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  selectedUserId,
  onSelectUser,
}) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [selectedCompleting, setSelectedCompleting] = useState('all');
  const handleFilter = useCallback(() => {
    setVisibleTodos(
      todos.filter(todo => {
        const filterTitleLower = filterTitle.toLowerCase();
        const titleLower = todo.title.toLowerCase();

        switch (selectedCompleting) {
          case 'completed':
            return titleLower.includes(filterTitleLower) && todo.completed;
          case 'active':
            return titleLower.includes(filterTitleLower) && !todo.completed;
          case 'all':
            return titleLower.includes(filterTitleLower);
          default:
            return todo;
        }
      }),
    );
  }, [filterTitle, selectedCompleting, todos]);

  useEffect(() => {
    handleFilter();
  }, [todos, filterTitle, selectedCompleting]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="is-flex">
        <label className="label" htmlFor="filterByTitle">
          Search:
          <input
            type="text"
            name="filterByTitle"
            className="TodoList__input-filter input is-small is-inline"
            id="filterByTitle"
            data-cy="filterByTitle"
            value={filterTitle}
            onChange={(event) => {
              setFilterTitle(event.target.value);
            }}
          />
        </label>

        <select
          className="select"
          value={selectedCompleting}
          onChange={(event) => {
            setSelectedCompleting(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="active">Not completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={`
               TodoList__item
               TodoList__item--${todo.completed ? 'checked' : 'unchecked'}
               `}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>
              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                  },
                )}
                type="button"
                data-cy="userButton"
                onClick={() => {
                  onSelectUser(todo.userId);
                }}
              >
                {`User#${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
