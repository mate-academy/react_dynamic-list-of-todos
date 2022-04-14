import React, { useState } from 'react';
import { Todo } from '../../types';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  selectUser: (userId: number) => void;
  selectedUserId: number;
}

export const TodoList = React.memo<Props>(
  ({
    todos,
    selectUser,
    selectedUserId,
  }) => {
    const [query, setQuery] = useState('');
    const [todosStatus, setTodosStatus] = useState('all');

    const getFilteredTodos = () => {
      return todos.filter(todo => {
        switch (todosStatus) {
          case 'active':
            return !todo.completed && todo.title.includes(query);
          case 'completed':
            return todo.completed && todo.title.includes(query);
          default:
            return todo.title.includes(query);
        }
      });
    };

    const filteredTodos = getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__filter-menu">
          <input
            className="TodoList__input"
            type="text"
            placeholder="Begin typing for search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="TodoList__select"
            onChange={(event) => setTodosStatus(event.target.value)}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos
              .map(todo => (
                <li
                  className={
                    `TodoList__item
                    ${todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`
                  }
                  key={todo.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    onClick={() => selectUser(todo.userId)}
                    className={`
                      button
                      TodoList__user-button
                      ${selectedUserId === todo.userId
                        && 'TodoList__user-button--selected'}
                    `}
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
  },
);
