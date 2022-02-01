import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (selectedUserId: number) => void;
  selectedUserId: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => void;
  changeTodoStatus: (todoId: number) => void;
  titleToSearch: string;
  todosToShow: string;
  randomize: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
  handleChange,
  changeTodoStatus,
  titleToSearch,
  todosToShow,
  randomize,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__search-bar">
      <label className="label" htmlFor="title-input">
        Search todo:
        <div className="control">
          <input
            type="text"
            className="input TodoList__title-input"
            id="title-search-bar"
            name="titleToSearch"
            placeholder="Title"
            value={titleToSearch}
            onChange={(event) => handleChange(event)}
          />
        </div>
      </label>

      <div className="select">
        <select
          name="todosToShow"
          value={todosToShow}
          onChange={(event) => handleChange(event)}
        >
          <option value="">Show all</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button
        type="button"
        name="isRandomized"
        className={classNames(
          'button',
          'TodoList__randomize-button',
          'is-light',
        )}
        onClick={() => randomize()}
      >
        Randomize
      </button>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames(
              'TodoList__item',
              { 'TodoList__item--unchecked': !todo.completed },
              { 'TodoList__item--checked': todo.completed },
            )}
            key={todo.id}
          >

            <label htmlFor={`todo-checkbox-${todo.id}`}>
              <input
                type="checkbox"
                id={`todo-checkbox-${todo.id}`}
                name="todo-checkbox"
                checked={todo.completed}
                onChange={() => changeTodoStatus(todo.id)}
              />
              <p>
                {todo.title}
                {todo.id}
              </p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected': selectedUserId === todo.userId },
              )}
              type="button"
              value={todo.userId}
              onClick={() => selectUser(todo.userId)}
            >
              {`User#${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
