import React, { ChangeEvent } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  selectUser: (userId: number) => void,
  selectedUserId: number,
  title: string,
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const TodoList: React.FC<Props> = ({
  todos, selectUser, selectedUserId, title, handleInputChange, handleSelectChange,
}) => (
  <div className="TodoList">
    <input
      type="text"
      value={title}
      onChange={handleInputChange}
    />

    <select onChange={handleSelectChange}>
      <option value="all">all</option>
      <option value="completed">completed</option>
      <option value="active">active</option>
    </select>

    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed },
            )}
          >
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                'TodoList__user-button--selected',
                'button',
                { active: selectedUserId === todo.userId },
              )}
              type="button"
              onClick={() => selectUser(todo.userId)}
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
