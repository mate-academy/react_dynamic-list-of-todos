import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleClick: (value: Todo) => void;
  activeID: number
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleClick,
  activeID,
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
        <th aria-label="gap" />
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => {
        const isActive = activeID === todo.id;

        return (
          <tr
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': isActive },
            )}
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
              <p className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i className={`far ${isActive ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
