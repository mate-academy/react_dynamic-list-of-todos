import React from 'react';
import { FullTodo } from '../../types/FullTodo';
import classNames from 'classnames';

type Props = {
  todos: FullTodo[];
  visibleModal: FullTodo | null;
  setVisibleTodo: (todo: FullTodo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  visibleModal,
  setVisibleTodo,
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
      {todos.map((todo: FullTodo) => (
        <tr
          data-cy="todo"
          className={classNames({
            'has-background-info-light':
              visibleModal && todo.id === visibleModal.id,
          })}
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
            <p
              className={classNames({
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
              onClick={() => setVisibleTodo(todo)}
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
