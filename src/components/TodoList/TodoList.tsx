import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  selectedTodoId?: number | null;
  // onShowModal: (todo: Todo) => void;
  onShowModal: (todoId: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
  onShowModal,
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
          <tr data-cy="todo" className="" key={todo.id}>
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
                // onClick={() => onShowModal(todo)}
                onClick={() => onShowModal(todo.id)}
              >
                {todo.id === selectedTodoId ? (
                  <i className="far fa-eye-slash" />
                ) : (
                  <i className="far fa-eye" />
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
