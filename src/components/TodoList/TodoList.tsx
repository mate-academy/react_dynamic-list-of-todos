import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[]
  selectUser: (userId: number) => void
  onFilterTitle: (title: string) => void
  onFilterStatus: (title: string) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  onFilterTitle,
  onFilterStatus,
} : Props) => (
  <div className="TodoList">
    <div className="TodoList__search">
      <h4>Search:</h4>
      <div className="TodoList__search-fields">
        <label className="TodoList__search-label">
          by Title
          <input
            className="TodoList__search-input"
            data-cy="filterByTitle"
            onChange={(e) => onFilterTitle(e.target.value)}
          />
        </label>
        <label className="TodoList__search-label">
          by Status
          <select
            onChange={(e) => onFilterStatus(e.target.value)}
            className="TodoList__search-input"
          >
            <option>all</option>
            <option>active</option>
            <option>completed</option>
          </select>
        </label>
      </div>
    </div>
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo) => (
          <li
            data-cy="listOfTodos"
            key={todo.id}
            className={classNames(
              'TodoList__item',
              {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              },
            )}
          >
            <label>
              <input
                type="checkbox"
                readOnly
                checked={todo.completed}
              />

              <p>{todo.title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => {
                selectUser(todo.userId);
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
