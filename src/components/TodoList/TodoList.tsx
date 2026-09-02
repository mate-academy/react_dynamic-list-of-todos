import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  selectedTodoId?: number | null;
  onSelectTodo?: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId = null,
  onSelectTodo = () => {},
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo.completed,
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
                  onSelectTodo(todo);
                }}
              >
                <span className="icon">
                  {selectedTodoId === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
