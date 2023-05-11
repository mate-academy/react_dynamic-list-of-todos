import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onModalOpen: (id: number) => void;
  isModalOpen: boolean;
  selectedModalId: number;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onModalOpen,
  isModalOpen,
  selectedModalId,
}) => (
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
      {todos.map((todo) => {
        const { id, title, completed } = todo;

        return (
          <tr data-cy="todo" className="" key={id}>
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

            <td className="is-vcentered">
              <p className={cn({
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
                onClick={() => {
                  onModalOpen(id);
                }}
              >
                <span className="icon">
                  <i
                    className={cn({
                      'far fa-eye': !isModalOpen || selectedModalId !== id,
                      'far fa-eye-slash': isModalOpen && selectedModalId === id,
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
