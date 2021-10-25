import React from 'react';
import './TodoList.scss';
import className from 'classnames';

interface Props {
  todos: Todo[],
  onUser: (value:number) => void,
  filterValue: string
  selectValue: string
  changeFilterValue: (value: string) => void
  changeSelectValue: (value: string) => void
}

export const TodoList: React.FC<Props> = ({
  todos, onUser, filterValue, selectValue, changeSelectValue, changeFilterValue,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <input
        type="text"
        value={filterValue}
        onChange={event => changeFilterValue(event.target.value)}
      />
      <select
        value={selectValue}
        onChange={event => changeSelectValue(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>

      </select>
      <ul className="TodoList__list">
        {todos.map(todo => {
          const {
            id, title, userId, completed,
          } = todo;

          return (
            <li
              className={className('TodoList__item', `TodoList__item--${
                completed ? 'checked' : 'unchecked'
              }`)}
              key={id}
            >
              <label htmlFor={title}>
                <input type="checkbox" id={title} readOnly checked={completed} />
                <p>{title}</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
                onClick={() => {
                  onUser(userId);
                }}
              >
                {`User#${userId}`}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
