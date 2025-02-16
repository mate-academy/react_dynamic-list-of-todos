import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface TodoProps {
  todos: Todo[];
  openModal: (todo: Todo) => void;
  activeTodoId: number | null;
  onTodoClick: (id: number) => void;
  modalWindow: boolean;
}

export const TodoList: React.FC<TodoProps> = ({
  todos,
  openModal,
  activeTodoId,
  onTodoClick,
  modalWindow,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>Completed</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {todos.map(t => (
          <tr
            data-cy="todo"
            className={cn('', {
              'has-background-info-light': activeTodoId === t.id && modalWindow,
            })}
            key={t.id}
            onClick={() => onTodoClick(t.id)}
          >
            <td className="is-vcentered">{t.id}</td>
            <td className="is-vcentered">
              {t.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn('', {
                  'has-text-danger': !t.completed,
                  'has-text-success': t.completed,
                })}
              >
                {t.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                onClick={() => openModal(t)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': activeTodoId !== t.id || !modalWindow,
                      'fa-eye-slash': activeTodoId === t.id && modalWindow,
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
};
