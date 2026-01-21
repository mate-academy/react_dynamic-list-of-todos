import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface TodoListProps {
  todos: Todo[];
  selectedTodoId: number | null;
  onSelectTodo: (id: number | null) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  const handleSelectTodo = (id: number) => {
    onSelectTodo(selectedTodoId === id ? null : id);
  };

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
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodoId === todo.id,
            })}
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
                className={cn({
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
                onClick={e => {
                  e.stopPropagation();
                  handleSelectTodo(todo.id);
                }}
              >
                <span className="icon">
                  <i
                    className={cn({
                      'far fa-eye-slash': selectedTodoId === todo.id,
                      'far fa-eye': selectedTodoId !== todo.id,
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
