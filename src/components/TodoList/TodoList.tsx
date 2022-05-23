import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

type Props = {
  todos: Todo[]
  selectedUserId: (a: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, selectedUserId }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filterStatus = () => {
    switch (status) {
      case 'Active':
        return todos.filter((todo) => !todo.completed);

      case 'Completed':
        return todos.filter((todo) => todo.completed);

      default:
        return todos;
    }
  };

  const visibleTodo = filterStatus().filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  const getChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setStatus(value);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__box">
        <div className="field">
          <div className="control">
            <input
              type="text"
              id="search-query"
              className="input"
              value={query}
              placeholder="Search"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <label>
          <select
            name="completed"
            onChange={getChangeStatus}
            value={status}
          >
            <option value="all">
              All
            </option>
            <option value="Active">
              Not completed
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>
        </label>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {visibleTodo.map((todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                {
                  'TodoList__item--unchecked': todo.completed === false,
                })}
            >
              <label data-cy="filterByTitle">
                <input type="checkbox" />
                <p>
                  {todo.title}
                </p>
              </label>
              <button
                className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                type="button"
                onClick={() => selectedUserId(todo.userId)}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
