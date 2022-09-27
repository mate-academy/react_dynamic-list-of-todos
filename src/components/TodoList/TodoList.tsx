import React, { useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  setSelectedUserId: (x: number) => void;
  selectedTodoId: number;
  setSelectedTodoId: (x: number) => void;
  onSetTodos: (x: string) => void;
  onSelectTodos: (x: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedUserId,
  selectedTodoId,
  setSelectedTodoId,
  onSetTodos,
  onSelectTodos,
}) => {
  const [status, setStatus] = useState('all');
  const filterByStatus = (statusFromSelect: string) => {
    setStatus(statusFromSelect);
    onSelectTodos(statusFromSelect);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__contols">
        <input
          type="text"
          data-cy="filterByTitle"
          placeholder="Filter by title"
          onChange={(event) => {
            onSetTodos(event.target.value);
          }}
        />

        <select
          name="todo-status"
          value={status}
          onChange={(event) => {
            filterByStatus(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {todos.map(todo => (
            <li
              key={todo.id}
              className={todo.completed
                ? 'TodoList__item TodoList__item--checked'
                : 'TodoList__item TodoList__item--unchecked'}
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
                className={selectedTodoId === todo.id
                  ? 'TodoList__user-button--selected button'
                  : 'TodoList__user-button button'}
                type="button"
                data-cy="userButton"
                onClick={() => {
                  setSelectedUserId(todo.userId);
                  setSelectedTodoId(todo.id);
                }}
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
