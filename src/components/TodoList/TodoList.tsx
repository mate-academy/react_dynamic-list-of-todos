import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { User } from '../../types/User';
import { getUser } from '../../api';
type Props = {
  todoList: Todo[];
  setTodo: (todo: Todo) => void;
  setUser: (user: User) => void;
  setLoading: (status: boolean) => void;
};
export const TodoList: React.FC<Props> = ({
  todoList,
  setTodo,
  setUser,
  setLoading,
}) => (
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
      {todoList.map((todo, index) => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{index + 1}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
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
              onClick={() => {
                setLoading(true);
                setTodo(todo);
                getUser(todo.userId)
                  .then(user => setUser(user))
                  .finally(() => setLoading(false));
              }}
            >
              <span className="icon">
                <i className="far fa-eye" />
                {/* <i className="far fa-eye-slash" />/ */}
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
