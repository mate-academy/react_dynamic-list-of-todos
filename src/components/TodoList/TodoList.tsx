import React, { memo, useCallback } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  selectedTodoId: number;
  onSelectTodoId: (id: number) => void;
}
export const TodoList: React.FC<TodoListProps> = memo(({
  todos,
  selectedTodoId,
  onSelectTodoId,
}) => {
  const handleSelectTodo = useCallback((todoId: number) => {
    onSelectTodoId(todoId);
  }, [onSelectTodoId]);

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
          const isTodoSelected = todo.id === selectedTodoId;

          return (
            <tr
              data-cy="todo"
              className=""
              key={todo.id}
            >
              <td className="is-vcentered">
                {todo.id}
              </td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={cn({
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
                  onClick={() => handleSelectTodo(todo.id)}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye': !isTodoSelected,
                      'fa-eye-slash': isTodoSelected,
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
});
