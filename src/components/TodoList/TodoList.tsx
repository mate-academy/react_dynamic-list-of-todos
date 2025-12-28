import React from 'react';
import { Props } from '../../types/Props';
import classNames from 'classnames';

export const TodoList: React.FC<Props> = ({
  todos,
  handleTodoClick,
  selectedTodoId,
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
      {todos.map(todo => {
        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodoId === todo.id,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {!todo.completed ? (
              <td className="is-vcentered" />
            ) : (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            )}
            <td className="is-vcentered is-expanded">
              {!todo.completed ? (
                <p className="has-text-danger">{todo.title}</p>
              ) : (
                <p className="has-text-success">{todo.title}</p>
              )}
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleTodoClick(todo)}
              >
                {selectedTodoId !== todo.id ? (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                )}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

// fas fa-eye-slash
