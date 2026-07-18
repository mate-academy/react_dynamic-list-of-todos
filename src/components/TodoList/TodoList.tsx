// src/components/TodoList/TodoList.tsx
import React from 'react';
import { Todo } from '../../types.ts';
import classNames from 'classnames';
interface TodoListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoClick: (todo: Todo) => void;
}
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onTodoClick,
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
          <th />
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodo?.id === todo.id;
          return (
            <tr key={todo.id} data-cy="todo">
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
                  type="button"
                  className="button"
                  data-cy="selectButton"
                  onClick={() => onTodoClick(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': isSelected,
                        'fa-eye': !isSelected,
                      })}
                    />
                  </span>
                  <span>{isSelected ? 'Hide' : 'Show'}</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

