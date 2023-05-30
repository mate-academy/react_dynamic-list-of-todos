import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[],
  onTodoSelection: (todo: Todo) => void,
  selectedTodo: Todo | null,
}

export const TodoList: React.FC<TodoListProps>
= ({ todos, onTodoSelection, selectedTodo }) => {
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
          const { id, completed, title } = todo;

          return (
            <tr
              data-cy="todo"
              className={
                cn({
                  'has-background-info-light':
                  selectedTodo?.id === id,
                })
              }
              key={todo.id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={cn({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
                >
                  {title}

                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onTodoSelection(todo)}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye': selectedTodo?.id !== id,
                      'fa-eye-slash': selectedTodo?.id === id,
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
