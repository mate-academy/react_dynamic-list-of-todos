import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  userId: number,
  input: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  select: string,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  userId,
  input,
  handleChange,
  select,
  handleSelectChange,
}) => (

  <div className="TodoList">
    <h2>Todos:</h2>
    <label htmlFor="input">
      Filter by Title:
      {' '}
      <input
        type="text"
        name="input"
        id="input"
        value={input}
        onChange={handleChange}
      />
      {'  '}
      <select
        name="select"
        value={select}
        onChange={handleSelectChange}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not">Not completed</option>
      </select>
    </label>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
            key={todo.id}
          >
            <label htmlFor={`${todo.id}`}>
              <input
                type="checkbox"
                id={`${todo.id}`}
                checked={todo.completed}

              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user- button--selected': todo.userId === userId },
              )}
              type="button"
              onClick={() => selectUser(todo.userId)}
            >
              User #
              {todo.userId}
            </button>
          </li>
        ))}

      </ul>
    </div>
  </div>
);
