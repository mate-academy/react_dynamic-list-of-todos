import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  modalTodo: Todo | null;
  hanldeModalTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  hanldeModalTodo,
  modalTodo,
}) => {
  const setModal = (todo: Todo) => {
    hanldeModalTodo(todo);
  };

  return (
    <table className="table is-narrow is-fullwidth">
      {todos.length === 0 ? (
        <p>There are no todos for you.</p>
      ) : (
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
      )}

      <tbody>
        {todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
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
                  className={completed ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setModal(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${modalTodo ? 'fa-eye-slash' : 'fa-eye'}`}
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
