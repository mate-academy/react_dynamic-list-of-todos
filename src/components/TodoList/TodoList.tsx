import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
interface TodoListProps {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  onHide: () => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onShow,
  onHide,
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
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td
            className={classNames('is-vcentered', 'is-expanded', {
              'has-text-success': todo.completed,
              'has-text-danger': !todo.completed,
            })}
          >
            <p>{todo.title}</p>
          </td>
          <td className="has-text-right is-vcentered">
            {todo.id === selectedTodoId ? (
              <button
                data-cy="selectButton"
                type="button"
                className="button"
                onClick={onHide}
                aria-label="hide"
              >
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                type="button"
                className="button"
                onClick={() => onShow(todo)}
                aria-label="show"
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
