import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  setSelectEye: (value: Todo | null) => void;
  selectEye: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectEye,
  selectEye,
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={cn('', {
              'has-background-info-light':
                selectEye && selectEye.id === todo.id,
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
            <td className="is-vcentered">
              <p
                className={cn('has-text', {
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                onClick={() => setSelectEye(todo)}
                type="button"
              >
                <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': !selectEye || selectEye.id !== todo.id,
                        'fa-eye-slash':
                        selectEye && selectEye.id === todo.id,
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
