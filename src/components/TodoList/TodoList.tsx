import React from 'react';
import classnames from 'classnames';
import './TodoList.scss';
import { Todo } from '../../types/todo';

type Props = {
  todos: Todo[];
  selectUser: any,
  selectedId: number,
};

export const TodoList: React.FC<Props> = ({ todos, selectUser, selectedId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo: Todo) => {
          return (
            <li
              key={todo.id}
              className={
                classnames('TodoList__item', { 'TodoList__item--unchecked': !todo.completed }, { 'TodoList__item--checked': todo.completed })
              }
            >
              <label htmlFor="todo1">
                <input type="checkbox" id="todo1" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                onClick={() => selectUser(todo.userId)}
                className={classnames('TodoList__user-button button', { 'TodoList__user-button--selected': todo.userId === selectedId })}
                type="button"
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          );
        })}

        {/* <li className="TodoList__item TodoList__item--checked">
          <label>
            <input type="checkbox" checked readOnly />
            <p>distinctio vitae autem nihil ut molestias quo</p>
          </label>

          <button
            className="TodoList__user-button button"
            type="button"
          >
            User&nbsp;#2
          </button>
        </li> */}
      </ul>
    </div>
  </div>
);
