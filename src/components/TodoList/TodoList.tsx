import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  selectUsers: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectUsers }) => (
  <table
    className="table is-narrow is-fullwidth"
  >
    <tbody>
      {todos?.map(todo => (
        <tr
          className={todo.completed
            ? ('has-background-success-light has-text-success')
            : ('has-background-danger-light has-text-danger')}
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered ">
            {todo.completed && (
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={classNames(
              { 'has-text-danger': !todo.completed },
              { 'has-text-success': todo.completed },
            )}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              className="button is-warning"
              type="button"
              onClick={() => {
                selectUsers(todo);
              }}
            >
              Show
              {' '}
              {todo.userId}
            </button>
          </td>
        </tr>
      ))}
      {}
    </tbody>
  </table>
);
