import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[]
  todoSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<TodoListProps> = (
  {
    todos, todoSelect, selectedTodo,
  },
) => {
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
        {todos.map((todo) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo === selectedTodo ? 'has-background-info-light' : ''}
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
              <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => todoSelect(todo)}
              >
                <span className="icon">
                  <i className={`far ${todo === selectedTodo ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
