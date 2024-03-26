import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectTodo,
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
      {todos.map(({ id, completed, title, userId }) => (
        <tr
          data-cy="todo"
          className={classNames({
            'has-background-info-light': selectedTodo?.id === id,
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
            <p
              className={classNames({
                [completed ? 'has-text-success' : 'has-text-danger']: true,
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
              onClick={() => selectTodo({ id, completed, title, userId })}
            >
              <span className="icon">
                <i
                  className={classNames(
                    'far',
                    selectedTodo?.id === id ? 'fa-eye-slash' : 'fa-eye',
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
