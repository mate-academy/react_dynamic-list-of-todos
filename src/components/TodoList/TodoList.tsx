import React from 'react';
import { Todo } from '../../types/Todo';
import { SetTodo } from '../../interfaces/interfaces';
import classNames from 'classnames';
type Props = {
  todos: Todo[];
  handleShowModal: (id: number, information: SetTodo) => void;
  choseTodo: SetTodo;
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
          todos.map(({ id, title, completed, userId }) => {
            return (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light':
                    choseTodo.highlighteTodo && choseTodo.id === id,
                })}
                key={id}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() =>
                      handleShowModal(userId, {
                        title,
                        id,
                        completed,
                        highlighteTodo: true,
                      })
                    }
                  >
                    {choseTodo.highlighteTodo && choseTodo.id == id ? (
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
