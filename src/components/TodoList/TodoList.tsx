import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId?: number;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          // 1. Stable key using todo.id
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td
              className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.title}
            </td>
            <td>
              <span
                className={classNames('icon', {
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                <i
                  className={classNames('fas', {
                    'fa-check': todo.completed,
                    'fa-xmark': !todo.completed,
                  })}
                />
              </span>
            </td>
            <td>
              <button
                type="button"
                className={classNames('button', 'is-link', {
                  'is-outlined': selectedTodoId !== todo.id,
                })}
                // 2. Passing the full todo object back to App
                onClick={() => onSelectTodo(todo)}
              >
                Show
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
