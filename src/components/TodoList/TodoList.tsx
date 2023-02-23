import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  selectTodo: (id:number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectTodo,
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
        {todos.map(({ id, title, completed }) => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodoId === id,
            })}
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
                onClick={() => {
                  selectTodo(id);
                }}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': selectedTodoId !== id,
                    'fa-eye-slash': selectedTodoId === id,
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
