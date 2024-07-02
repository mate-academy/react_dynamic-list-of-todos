import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  setSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  setSelectedTodo,
  todos,
  selectedTodo,
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
        {todos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon has-text-success">
                  <i className="fas fa-check" />
                </span>
              ) : (
                <span className="icon has-text-danger">
                  <i className="fas fa-times" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
                /* style={{ color: todo.completed ? '#48c78e' : 'inherit' }} */
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                onClick={() => setSelectedTodo(todo)}
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={`far ${selectedTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
