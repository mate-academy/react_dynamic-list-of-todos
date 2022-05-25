import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  setUserId: (id: number) => void,
}

enum Show {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoList: React.FC<Props> = ({
  todos,
  setUserId,
}) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [completFilter, setcompletFilter] = useState('All');
  const [todosToShow, setTodosToShow] = useState(todos);

  useEffect(() => {
    setTodosToShow(todos.filter(todo => {
      const filtredByTitle = todo.title.toLowerCase()
        .includes(searchTitle.toLowerCase());

      switch (completFilter) {
        case Show.Active:
          return filtredByTitle && !todo.completed;
        case Show.Completed:
          return filtredByTitle && todo.completed;
        case Show.All:
          return filtredByTitle;
        default:
          return false;
      }
    }));
  }, [todos, searchTitle, completFilter]);

  return (
    <div className="TodoList">
      <h2 className="TodoList__title">Todos: </h2>
      <label htmlFor="searchBar">
        <input
          type="text"
          value={searchTitle}
          onChange={({ target }) => {
            setSearchTitle(target.value);
          }}
          id="searchBar"
          className="TodoList__bar"
          placeholder="Search Title"
        />
      </label>
      <select
        className="TodoList__select"
        value={completFilter}
        onChange={(event) => {
          setcompletFilter(event.target.value);
        }}
      >
        <option value={Show.All}>All</option>
        <option value={Show.Active}>Active</option>
        <option value={Show.Completed}>Completed</option>
      </select>

      <div className="TodoList__container">
        <ul className="TodoList__list">
          {todosToShow.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label>
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                onClick={() => {
                  setUserId(todo.userId);
                }}
                className="TodoList__user-button button"
                type="button"
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
