import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos?: Todo[];
  onSelect?: (todo: Todo | null) => void;
  selectedTodoId?: number | null; // додано
}

export const TodoList: React.FC<TodoListProps> = ({
  todos = [],
  onSelect,
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
        <th></th>
      </tr>
    </thead>

    <tbody>
      {todos.map((todo, index) => {
        const isSelected = todo.id === selectedTodoId;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo.completed ? 'has-background-info-light' : ''}
          >
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td
              className={`is-vcentered is-expanded ${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
            >
              <p>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  if (isSelected) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    onSelect && onSelect(null);
                  } else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    onSelect && onSelect(todo);
                  }
                }}
              >
                <span className="icon">
                  {isSelected ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
