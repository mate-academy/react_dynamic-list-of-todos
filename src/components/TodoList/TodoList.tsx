import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  handleShow: (todo: Todo) => void;
  selectedTodoId?: number;
}

export const TodoList: React.FC<Props> = ({
  todos,
  handleShow,
  selectedTodoId,
}) => {
  return (
    <table className="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id} data-cy="todo">
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>
              {todo.completed ? (
                <span data-cy="iconCompleted">✔️</span>
              ) : (
                <span data-cy="iconPlanned">✖️</span>
              )}
            </td>
            <td>
              <button data-cy="selectButton" onClick={() => handleShow(todo)}>
                <i
                  className={
                    selectedTodoId === todo.id
                      ? 'fas fa-eye-slash'
                      : 'fas fa-eye'
                  }
                ></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
