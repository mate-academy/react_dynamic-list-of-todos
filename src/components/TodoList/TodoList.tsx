import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  handleTodo: (todo: Todo) => void;
  isModal: boolean;
  closeEyes: Record<number, boolean>;
  toggleEye: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleTodo,
  closeEyes,
  toggleEye,
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
          <th></th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          return (
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
                {todo.completed ? (
                  <p className="has-text-success">{todo.title}</p>
                ) : (
                  <p className="has-text-danger">{todo.title}</p>
                )}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => {
                    handleTodo(todo);
                    toggleEye(todo.id);
                  }}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': !closeEyes[todo.id],
                        'fa-eye-slash': closeEyes[todo.id],
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
