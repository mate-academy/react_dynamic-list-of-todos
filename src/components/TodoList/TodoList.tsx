import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  openModal: (userId: number, todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  openModal,
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
        {todos.map(todo => {
          const {
            id,
            title,
            completed,
            userId,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodo,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}

              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames(completed
                  ? 'has-text-success'
                  : 'has-text-danger')}
                >
                  {title}

                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => openModal(userId, todo)}
                >
                  <span className="icon">
                    <i className={classNames(selectedTodo
                      ? 'far fa-eye-slash'
                      : 'far fa-eye')}
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
