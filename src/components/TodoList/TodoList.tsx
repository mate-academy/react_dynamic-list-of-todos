import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  showModal: (id: number) => void;
  activeTodo: Todo | null;
}
export const TodoList: React.FC<Props> = ({
  todos,
  showModal,
  activeTodo,
}) => {
  const activeTodoId = activeTodo ? activeTodo.id : null;

  return (
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
              className=""
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
              <td className="is-vcentered">
                <p className={classnames({
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
                  onClick={() => showModal(todo.id)}
                >
                  <span className="icon">
                    <i className={classnames('far', {
                      'fa-eye-slash': todo.id === activeTodoId,
                      'fa-eye': todo.id !== activeTodoId,
                    })}
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
};
