import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  modalInfo: Todo | null;
  setModalInfo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todos,
  modalInfo,
  setModalInfo,
}) => {
  return (
    <tbody>
      {todos.map(todo => {
        const isSelected = modalInfo?.id === todo.id;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': isSelected,
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
                className={cn(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setModalInfo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      isSelected ? 'fa-eye-slash' : 'fa-eye',
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
