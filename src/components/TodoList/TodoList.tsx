import classnames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  changeStatus: (id: number) => void,
  title: string,
  handleTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
  status: string,
  handleStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    selectUser,
    changeStatus,
    title,
    handleTitle,
    status,
    handleStatus,
  } = props;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <label htmlFor="title">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitle}
          className="input TodoList__findByTitle"
          placeholder="Find by title"
        />
      </label>

      <div className="select TodoList__findByComplited">
        <select
          value={status}
          onChange={handleStatus}
        >
          <option value="">All</option>
          <option value="complited">Complited</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classnames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label htmlFor={`checkbox-${todo.id}`}>
                <input
                  type="checkbox"
                  id={`checkbox-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => changeStatus(todo.id)}
                />
                <p>{todo.title}</p>
              </label>

              <button
                type="button"
                className="
                TodoList__user-button
                TodoList__user-button--selected
                button
                "
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
};
