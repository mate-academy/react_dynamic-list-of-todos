import React from 'react';
import { Todo } from '../../types/Todo';

import classnames from 'classnames';

interface Props {
  todos: Todo[];
  showModalWindow?: (todo: Todo) => void;
  isTodoSelected?: number;
}

export const TodoList: React.FC<Props> = ({
  todos,
  showModalWindow = () => {},
  isTodoSelected,
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
        <th></th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo" className="">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classnames(
                todo.completed ? 'has-text-success' : 'has-text-danger',
              )}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => showModalWindow(todo)}
            >
              <span className="icon">
                <i
                  className={classnames('far', {
                    'fa-eye-slash':
                      isTodoSelected && isTodoSelected === todo.id,
                    'fa-eye': !(isTodoSelected && isTodoSelected === todo.id),
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
