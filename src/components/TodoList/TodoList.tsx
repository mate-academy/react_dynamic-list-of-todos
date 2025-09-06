import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onShow }) => (
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
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames('base-row-classes',
            { 'completed-bg-class': todo.completed,
              'active-bg-class': !todo.completed
            })}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check"></i>
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames('base-text-classes',
                { 'text-green-600': todo.completed,
                  'text-gray-800': !todo.completed }
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
              onClick={() => onShow(todo)}
            >
              <span className="icon">
                <i
                  className={todo.completed ? 'far fa-eye-slash' : 'far fa-eye'}
                ></i>
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
