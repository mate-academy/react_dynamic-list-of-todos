/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  console.log('TodoList', todos);

  return (
    todos.length ? (
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <>
            {todos.map((todo) => {
              return (
                <tr key={todo.id} data-cy="todo" className="">
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed ? (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    ) : null}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
                        'has-text-danger': todo.completed === false,
                        'has-text-success': todo.completed === true,
                      })}
                    >
                      {todo.title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                        {/* <i className="far fa-eye-slash" /> */}
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </>
        </tbody>
      </table>
    ) : <Loader />
  );
};
