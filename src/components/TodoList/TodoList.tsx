import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
// import { TodoModal } from '../TodoModal';

interface Props {
  todos: Todo[];
  showModal: (value: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ todos, showModal }) => (
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
        <tr key={todo.id} data-cy="todo" className="has-background-info-light">
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
              className={classNames(
                { 'has-text-success': todo.completed },
                { 'has-text-danger': !todo.completed },
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
              onClick={() => showModal(todo)}
            >
              <span className="icon">
                <i className="far fa-eye fa-eye-slash" />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
