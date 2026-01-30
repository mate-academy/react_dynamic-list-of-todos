import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export const TodoList: React.FC<{
  todos: Todo[];
  setPostId: (id: number) => void;
  postId?: number | null;
  setStatus?: (status: string) => void;
}> = ({ todos, setPostId, postId }) => (
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
      {todos.length > 0 &&
        todos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
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
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
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
                onClick={() => setPostId(todo.id)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': postId === todo.id,
                      'fa-eye': postId !== todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);
