import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
interface TodoListProps {
  todos: Todo[];
  clickedID?: (id: Todo) => void;
  setClosedEye: (id: number) => void;
  closedEyeID?: number;
}
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  clickedID,
  setClosedEye,
  closedEyeID,
}) => {
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
        {todos.map((todo: Todo) => (
          <tr data-cy="todo" className="" key={todo.id}>
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
              <p
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
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
                onClick={() => {
                  clickedID?.(todo);
                  setClosedEye(todo.id);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'far fa-eye': !(closedEyeID === todo.id),
                      'far fa-eye-slash': closedEyeID === todo.id,
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
};
