import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodoId,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr key={todo.id} data-cy="todo">
              {/* ID */}
              <td className="is-narrow">{todo.id}</td>

              {/* TITLE */}
              <td className="is-expanded">{todo.title}</td>

              {/* COMPLETED ICON (CYPRESS NEEDS THIS EXACT ID) */}
              <td className="is-narrow">
                {todo.completed && (
                  <span data-cy="iconCompleted" className="icon">
                    <i className="fas fa-check-circle has-text-success" />
                  </span>
                )}
              </td>

              {/* ACTION */}
              <td className="has-text-right is-vcentered">
                {!isSelected ? (
                  <button
                    data-cy="selectButton"
                    className="button"
                    onClick={() => onSelect(todo)}
                  >
                    <i className="fas fa-eye" />
                  </button>
                ) : (
                  <button
                    data-cy="selectedButton"
                    className="button is-primary"
                  >
                    <i className="fas fa-eye-slash" />
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
