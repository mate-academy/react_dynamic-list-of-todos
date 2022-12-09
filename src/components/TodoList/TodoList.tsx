/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[],
  selectedTodo: Todo | null,
  onSelectedTodo: (selectedTodo: Todo | null) => void,
};

export const TodoList: React.FC<Props> = ({
  selectedTodo,
  onSelectedTodo,
  visibleTodos,
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

      {visibleTodos.map((todo) => {
        return (
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
            <td className="is-vcentered is-expanded">
              <p className={classNames('', {
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
                type="button"
                onClick={() => (
                  selectedTodo?.id === todo.id
                    ? onSelectedTodo(null)
                    : onSelectedTodo(todo)
                )}
              >
                <span className="icon">
                  <i className={selectedTodo?.id === todo.id
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
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
