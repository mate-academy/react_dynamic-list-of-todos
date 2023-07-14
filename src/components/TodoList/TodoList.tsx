import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  currentTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  currentTodo,
  onSelectTodo,
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
      {todos.map((todo) => {
        const { id, title, completed } = todo;

        return (
          <tr key={id} data-cy="todo">
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`has-text-${completed ? 'success' : 'danger'}`}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${currentTodo?.id === id ? '-slash' : ''}`}
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
