import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

export type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [selectedTodoId, setSelectedTodoId] = React.useState<number | null>(
    null,
  );

  const handleTodoClick = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  return (
    <>
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
                  onClick={() => handleTodoClick(todo.id)}
                >
                  <span className="icon">
                    {selectedTodoId === todo.id ? (
                      <i className="fas fa-eye-slash" /> // Ícone de "esconder"
                    ) : (
                      <i className="far fa-eye" /> // Ícone de "ver"
                    )}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTodoId !== null && (
        <TodoModal
          todo={todos.find(todo => todo.id === selectedTodoId)}
          onClose={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};
