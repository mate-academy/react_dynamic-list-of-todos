import React from 'react';
import './TodoList.scss';

import { LinearProgress } from '@mui/material';
import classNames from 'classnames';
import { Todo } from '../../types';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  changeUser: (id: number) => void;
};

export const TodoList: React.FC<Props>
  = ({ todos, selectedUserId, changeUser }) => {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        {!todos.length ? (
          <LinearProgress />
        ) : (
          <main>
            <div className="TodoList__list-container">
              <ul className="TodoList__list">
                {todos.map(todo => (
                  <li
                    className={classNames('TodoList__item',
                      { 'TodoList__item--unchecked': !todo.completed },
                      { 'TodoList__item--checked': todo.completed })}
                    key={todo.id}
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>

                    {todo.userId === selectedUserId ? (
                      <button
                        className="
                          TodoList__user-button
                          TodoList__user-button--selected
                          button
                        "
                        type="button"
                      >
                        User&nbsp;#
                        {todo.userId}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          changeUser(todo.userId);
                        }}
                        className="
                          TodoList__user-button
                          button
                        "
                        type="button"
                      >
                        User&nbsp;#
                        {todo.userId}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </main>
        )}
      </div>
    );
  };
