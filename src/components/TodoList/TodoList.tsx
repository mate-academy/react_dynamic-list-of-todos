import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  handleShowModal: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos, selectedTodo, handleShowModal,
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
        {todos.map(({
          id, completed, userId, title,
        }) => (
          <tr
            data-cy="todo"
            key={id}
            className=""
          >
            <td className="is-vcentered">
              {id}
            </td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={
                  () => handleShowModal({
                    id, completed, userId, title,
                  })
                }
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    {
                      'fa-eye-slash': selectedTodo?.id === id,
                      'fa-eye': selectedTodo?.id !== id,
                    },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
