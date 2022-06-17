import classNames from 'classnames';
import React, { Dispatch, useState } from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  setSelectedUserId: Dispatch<number>;
}

export const TodoList: React.FC<Props> = ({ todos, setSelectedUserId }) => {
  const [title, setTitle] = useState('');
  const [filteringTodos, setFilteringTodos] = useState('');
  const searchTodos = todos.filter(todo => todo.title.includes(title));

  const filterForTodo = (allTodos: Todo[]): Todo[] => {
    if (filteringTodos === 'active') {
      return allTodos.filter(todo => todo.completed === false);
    }

    if (filteringTodos === 'completed') {
      return allTodos.filter(todo => todo.completed === true);
    }

    return allTodos;
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        className="input is-link mb-4"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Search by title"
        data-cy="filterByTitle"
      />

      <select
        name="filter"
        className="select is-info my-3"
        onChange={(event) => {
          setFilteringTodos(event.target.value);
        }}
      >
        <option value="all">Show all</option>
        <option value="active">Show active</option>
        <option value="completed">Show completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filterForTodo(searchTodos).map((todo: Todo) => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
            >
              <label>
                <input type="checkbox" readOnly checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                type="button"
                onClick={() => {
                  setSelectedUserId(todo.userId);
                }}
                data-cy="userButton"
              >
                {`User #${todo.userId} - info`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
