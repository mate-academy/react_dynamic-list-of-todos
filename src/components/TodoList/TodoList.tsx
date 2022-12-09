import classNames from 'classnames';
import React from 'react';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodo: Todo | null,
  selectTodo: (todo: Todo) => void,
}

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
      {todos.map(todo => {
        const {
          completed,
          id,
          title,
        } = todo;

        return (
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
                className={
                  classNames({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })
                }
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
                  selectTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={
                    classNames('far', {
                      'fa-eye': selectedTodo?.id !== id,
                      'fa-eye-slash': selectedTodo?.id === id,
                    })
                  }
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
