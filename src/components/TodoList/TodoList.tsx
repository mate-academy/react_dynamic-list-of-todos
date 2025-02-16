import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  filter: 'all' | 'completed' | 'active';
  query: string;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onSelect,
  filter,
  query,
  selectedTodoId,
}) => {
  const isSelected = (todoId: number, selectedId: number | null) => {
    return selectedId === todoId;
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesFilter && matchesQuery;
  });

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
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              isSelected(todo.id, selectedTodoId)
                ? 'has-background-info-light'
                : ''
            }
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
                onClick={() => onSelect(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      isSelected(todo.id, selectedTodoId)
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
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
