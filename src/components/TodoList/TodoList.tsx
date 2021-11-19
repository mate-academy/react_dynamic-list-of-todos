import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

interface Prop {
  todos: Todo[],
  handleUserSelect: (userId: number) => void,
  title: string,
  completed: string,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => void
}
export const TodoList: React.FC<Prop> = ({
  todos,
  handleUserSelect,
  title,
  onInputChange,
  completed,
}) => (
  <div className="TodoList">
    <p>Filter Todos</p>
    <form action="Post">
      <div>
        <label htmlFor="title">
          Title:
          {' '}
          <input
            className="input"
            name="title"
            type="text"
            value={title}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="title">
          Completion:
          {' '}
          <select
            name="completed"
            value={completed}
            onChange={onInputChange}
          >
            <option
              value="not selected"
            >
              not selected
            </option>

            <option
              value="completed"
            >
              completed
            </option>
            <option
              value="not completed"
            >
              not completed
            </option>
          </select>
        </label>
      </div>
    </form>
    <h2>Todos:</h2>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.length > 0 && todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              { 'TodoList__item checked': todo.completed },
              { 'TodoList__item unchecked': !todo.completed },
            )}
          >
            <label htmlFor="completion">
              <input
                name="completion"
                type="checkbox"
                readOnly
                checked={todo.completed}
              />
              <p>{todo.title}</p>
            </label>

            <button
              onClick={() => handleUserSelect(todo.userId)}
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
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
