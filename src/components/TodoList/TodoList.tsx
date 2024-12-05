import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onModalButton: (todo: Todo) => void;
  clicked: (value: boolean) => void;
  resultClick: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onModalButton,
  clicked,
  resultClick,
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
            <td className="is-vcentered">
              {todo.completed && (
                <i className="fas fa-check" data-cy="iconCompleted"></i>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames('has-text-success', {
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
                  onModalButton(todo);
                  clicked(true);
                }}
              >
                <span className="icon">
                  {resultClick ? (
                    <i className="far fa-eye-slash" />
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
