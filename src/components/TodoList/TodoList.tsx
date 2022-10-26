/* eslint-disable */

import React from 'react';
import { Todo } from '../../types/Todo';
import cs from 'classnames';

interface Props {
  todos: Todo[];
  currentTodoId?: number;
  selectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ todos, currentTodoId, selectTodo }) => {
  return (
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
        {todos.map((todo: Todo) => (
          <tr key={todo.id} data-cy="todo">
            <td className="is-vcentered">
              {todo.id}
            </td>

            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cs(
                  {
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  }
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(todo)}
              >
                {todo.id === currentTodoId
                  ? (<span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>)
                  : (<span className="icon">
                    <i className="far fa-eye" />
                  </span>)}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
