import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[]
  selectUserId: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, selectUserId }) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <select className="TodoList__item--checked" name="select">
          <option value="value1" selected>All</option>
          <option value="value2">Active</option>
          <option value="value3">Completed</option>
        </select>
        <input
          className="TodoList__item--checked"
          type="text"
          placeholder="Search todo"
        />
        <ul className="TodoList__list">
          {todos.map(todo => (
            <>
              <li className={classNames({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
               TodoList__user-button
               TodoList__user-button--selected
               button
             "
                  type="button"
                  onClick={() => selectUserId(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
