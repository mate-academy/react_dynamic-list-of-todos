import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface TodoListProps {
  todos: Todo[];
  selectedTodo?: Todo;
  onSelectTodo?: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = memo(
  ({ todos, selectedTodo, onSelectTodo = () => {} }: TodoListProps) => (
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
          <tr key={todo.id} data-cy="todo" className="">
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
                className={cn({
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
                onClick={() => onSelectTodo?.(todo)}
              >
                <span className="icon">
                  {selectedTodo && selectedTodo.id === todo.id ? (
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
  ),
);

TodoList.displayName = 'MemoizedTodoList';
