import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todoList: Todo[];
  modalTodoId: number | null;
  setModalTodoId: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  modalTodoId,
  setModalTodoId,
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
        {todoList.map(todo => {
          const { id, completed, title } = todo;

          return (
            <tr
              data-cy="todo"
              className={cn({ 'has-background-info-light': modalTodoId })}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
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
                  onClick={() => setModalTodoId(id)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': !modalTodoId,
                        'fa-eye-slash': modalTodoId,
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
