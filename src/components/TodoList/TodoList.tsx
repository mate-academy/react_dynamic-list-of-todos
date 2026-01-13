import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null;
  onTodoSelect: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onTodoSelect,
}) => {
  return (
    <table className="table is-fullwidth is-striped">
      <tbody>
        {todos.map(todo => {
          const isSelected = todo.id === selectedTodoId;

          return (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    className="icon has-text-success"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">{todo.title}</td>

              <td className="is-vcentered">
                {!isSelected && (
                  <button
                    type="button"
                    className="button"
                    data-cy="selectButton"
                    onClick={() => onTodoSelect(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}

                {isSelected && (
                  <button
                    type="button"
                    className="button"
                    data-cy="selectButton"
                    onClick={() => onTodoSelect(null)}
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
};
