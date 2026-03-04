import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[] | [];
  modalId: number | null;
  onSelectModalId: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectModalId,
  modalId,
}) => {
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
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered is-expanded">
              {todo.completed && (
                <span
                  className="icon"
                  data-cy={todo.completed ? 'iconCompleted' : ''}
                >
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
                onClick={() => {
                  onSelectModalId(todo.id);
                }}
              >
                <span className="icon">
                  {todo.id === modalId ? (
                    <i className="fas fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
