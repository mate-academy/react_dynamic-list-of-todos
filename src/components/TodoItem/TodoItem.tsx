import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useAppContext } from '../../StoreApp';

export const TodoItem: React.FC = React.memo(() => {
  const {
    filteredTodos,
    isModalOpen,
    openModalForTodo,
  } = useAppContext();

  const handleOpenModalBtn = useCallback(
    (todoId) => {
      openModalForTodo(todoId);
    },
    [openModalForTodo],
  );

  return (
    <tbody>
      {filteredTodos.map((todo) => (
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
            {!isModalOpen && (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleOpenModalBtn(todo.id)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
});
