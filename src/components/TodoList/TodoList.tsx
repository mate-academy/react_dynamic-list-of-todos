import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({ todos, onSelectTodo, selectedTodo }) => {
  if (todos.length === 0) {
    return <p data-cy="no-todos-message">No todos found</p>;
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon has-text-success" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
                {todo.title}
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
                  <i className={`far ${todo.id === selectedTodo?.id ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};