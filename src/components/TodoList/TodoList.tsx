import React from 'react';
import classNames from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css';

import './TodoList.scss';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onTodoSelected: (id: number) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  onTodoSelected,
  selectedTodo,
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
          id,
          title,
          completed,
        } = todo;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo?.id === id,
            })}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {todo.completed
                ? (
                  <span className="icon icon-success" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )
                : (
                  <span className="icon icon-danger">
                    <i className="fas fa-xmark" />
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
                onClick={() => onTodoSelected(id)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    {
                      'fa-eye': selectedTodo?.id !== id,
                      'fa-eye-slash': selectedTodo?.id === id,
                    },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
));
