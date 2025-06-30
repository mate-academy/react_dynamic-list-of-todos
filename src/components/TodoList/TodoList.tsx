import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  filteredTodos: Todo[];
  setSelectedTodo: (todo: Todo) => void;
  selectedTodoId: number | null;
  setSelectedTodoId: (id: number | null) => void;
}

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setSelectedTodo,
  selectedTodoId,
  setSelectedTodoId,
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
        {filteredTodos.map(todo => {
          const iconCompleted = todo.completed
            ? 'has-text-success'
            : 'has-text-danger';

          const isSelected = selectedTodoId === todo.id;

          return (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    className={`icon ${iconCompleted}`}
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={iconCompleted}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setSelectedTodo(todo);
                    setSelectedTodoId(
                      selectedTodoId === todo.id ? null : todo.id,
                    );
                  }}
                >
                  <span className="icon" data-cy="iconToggleVisibility">
                    <i
                      className={`fas ${
                        isSelected ? 'fa-eye-slash' : 'fa-eye'
                      }`}
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
