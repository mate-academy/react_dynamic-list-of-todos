import React from 'react';
import { Todo } from '../../types/Todo';
interface TodoListProps {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
  onHideTodo: () => void;
  selectedTodoId: number | undefined;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoSelect,
  onHideTodo,
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
      {todos.map(todo => {
        const isSelected = todo.id === selectedTodoId;

        return (
          <tr key={todo.id} data-cy="todo">
            <td>{todo.id}</td>
            <td>
              {todo.completed && (
                <i className="fas fa-check" data-cy="iconCompleted" />
              )}
            </td>
            <td>{todo.title}</td>
            <td className="has-text-right">
              {!isSelected && (
                <button
                  onClick={() => onTodoSelect(todo)}
                  className="button"
                  data-cy="selectButton"
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}

              {isSelected && (
                <button
                  onClick={onHideTodo}
                  className="button is-danger"
                  data-cy="hideButton"
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
