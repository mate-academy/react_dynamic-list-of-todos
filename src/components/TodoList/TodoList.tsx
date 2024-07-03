import React from 'react';
import { TodoListProps } from './TodoList.types';

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  chooseTodo,
  selectedTodo,
  filterCategory,
}) => {
  const preparedTodos = todos.filter(todo => {
    switch (filterCategory) {
      case 'all':
        return true;
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });

  const filteredTodos = preparedTodos.filter(todo =>
    todo.title.toLowerCase().includes(filter.toLowerCase()),
  );

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
        {filteredTodos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="todo">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => chooseTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      todo !== selectedTodo ? 'far fa-eye' : 'far fa-eye-slash'
                    }
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
