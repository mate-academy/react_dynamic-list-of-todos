import React from 'react';
import className from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleShowModal:(todo: Todo) => void;
  selectTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos, handleShowModal, selectTodo,
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
      {todos.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={className({
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
              onClick={() => handleShowModal(todo)}
            >
              <span className="icon">
                <i className={className(
                  'far',
                  {
                    'fa-eye': selectTodo?.id !== todo.id,
                    'fa-eye-slash': selectTodo?.id === todo.id,
                  },
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
