import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  currentUserId: number,
  selectUserId: (userId: number) => void;
  changeStatusTodo: (todoId: string) => void;
  query: string,
  changeInput: (text: string) => void;
  selectedBy: string,
  selectHandler: (text:string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUserId,
  changeStatusTodo,
  currentUserId,
  query,
  changeInput,
  selectedBy,
  selectHandler,
}) => {
  const buttonStyle = (todoUserId: number) => {
    return classNames(
      'button',
      'TodoList__user-button',
      { 'TodoList__user-button--selected': currentUserId === todoUserId && currentUserId !== 0 },
      { 'TodoList__user-button--not-selected': currentUserId !== todoUserId && currentUserId !== 0 },
    );
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div>
        <label htmlFor="search-query" className="TodoList__search-label">
          <input
            type="text"
            id="search-query"
            className={classNames(
              'TodoList__search-input',
              { 'TodoList__search-input--empty': todos.length === 0 },
            )}
            placeholder="Search todo"
            value={query}
            onChange={event => changeInput(event.target.value)}
          />
        </label>

        <select
          className={classNames(
            'TodoList__select',
          )}
          name="select"
          id="select"
          value={selectedBy}
          onChange={(event) => selectHandler(event.target.value)}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <button
          type="button"
          className="button"
        >
          ramdomise
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            !todo.completed ? (
              <li
                key={`${todo.id}--unchecked`}
                className="TodoList__item TodoList__item--unchecked"
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={todo.id}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => changeStatusTodo(todo.id)}
                  />
                  <p>{todo.title}</p>
                  <p>
                    Create:&nbsp;
                    {todo.createdAt}
                  </p>
                  <p>{`Status: ${todo.completed} not`}</p>
                </label>

                <button
                  className={buttonStyle(todo.userId)}
                  type="button"
                  onClick={() => currentUserId !== todo.userId && selectUserId(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ) : (
              <li
                key={`${todo.id}--checked`}
                className="TodoList__item TodoList__item--checked"
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={todo.id}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => changeStatusTodo(todo.id)}
                  />
                  <p>{todo.title}</p>
                  <p>{todo.createdAt}</p>
                  <p>
                    Done:&nbsp;
                    {todo.updatedAt}
                  </p>
                  <p>{`Status: ${todo.completed} completed`}</p>
                  <p>{currentUserId}</p>
                </label>

                <button
                  className={buttonStyle(todo.userId)}
                  type="button"
                  onClick={() => currentUserId !== todo.userId && selectUserId(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};
