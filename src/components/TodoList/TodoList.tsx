import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
type Props = {
  todos: Todo[];
  handleShowModal: (todo: Todo) => void;
  choseTodo: Todo | null;
};
export const TodoList: React.FC<Props> = ({
  todos,
  handleShowModal,
  choseTodo,
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
        {todos &&
          todos.map(todo => {
            return (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light':
                    choseTodo && choseTodo.id === todo.id,
                })}
                key={todo.id}
              >
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
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleShowModal(todo)}
                  >
                    {choseTodo && choseTodo.id === todo.id ? (
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    ) : (
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
