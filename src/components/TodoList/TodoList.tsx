import React, { useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';

interface Prop {
  todos: Todo[],
  handleUserSelect: (userId: number) => void,
}
export const TodoList: React.FC<Prop> = ({
  todos,
  handleUserSelect,
}) => {
  const [title, setTitle] = useState('');
  const [completed, setCompletion] = useState('not selected');

  const prepareTodos = () => {
    return todos.filter(todo => {
      if (title) {
        return todo.title.toLowerCase().includes(title.toLowerCase());
      }

      if (completed === 'completed') {
        return todo.completed;
      }

      if (completed === 'not completed') {
        return !todo.completed;
      }

      return todo;
    });
  };

  const preparedTodos = prepareTodos();

  return (
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
              onChange={(event) => setTitle(event.target.value)}
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
              onChange={(event) => setCompletion(event.target.value)}
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
          {preparedTodos.length > 0 && preparedTodos.map(todo => (
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
};
