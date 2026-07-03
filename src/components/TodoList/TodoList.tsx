import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId: number | null;
  onSelectTodo: (todo: Todo) => void;
  onClearSelection: () => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
  onClearSelection,
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
        {todos.map(todo => {
          const isSelected = todo.id === selectedTodoId;

          return (
            <tr
              key={todo.id}
              className={isSelected ? 'has-background-info-light' : ''}
              data-cy="todo"
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td
                className={`is-vcentered ${
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }`}
              >
                {todo.title}
              </td>
              <td className="is-vcentered has-text-right">
                <button
                  type="button"
                  className="button is-link is-inverted"
                  data-cy="selectButton"
                  onClick={() =>
                    isSelected ? onClearSelection() : onSelectTodo(todo)
                  }
                >
                  <span className="icon">
                    <i className={`fas fa-eye${isSelected ? '-slash' : ''}`} />
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
