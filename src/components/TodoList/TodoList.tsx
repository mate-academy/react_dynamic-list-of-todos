import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleChoosenTodo: (id: number, userId: number) => void;
  selectedTodoId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleChoosenTodo,
  selectedTodoId,
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
          id,
          completed,
          title,
          userId,
        }) => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodoId === id,
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
              <p className={classNames({
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
                onClick={() => handleChoosenTodo(id, userId)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    {
                      'fa-eye-slash': selectedTodoId === id,
                      'fa-eye': selectedTodoId !== id,
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
