import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type TodoListProps = {
  todos: Todo[];
  onTodoClick?: (todo: Todo) => void;
  selectedTodoId: number | null;
  fullTodos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoClick,
  selectedTodoId,
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
        {todos.map(a => {
          return (
            <tr data-cy="todo" key={a.id} className="">
              <td className="is-vcentered">{a.id}</td>
              {a.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-danger': !a.completed,
                    'has-text-success': a.completed,
                  })}
                >
                  {a.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    onTodoClick?.(a);
                  }}
                >
                  <span className="icon">
                    <i
                      className={
                        selectedTodoId === a.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                    />{' '}
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
