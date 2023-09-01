import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoListProps = {
  todos: Todo[] | null;
  selectedTodo: Todo & { user?: User } | null;
  setSelectedTodo: React.Dispatch<React
    .SetStateAction<Todo & { user?: User } | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
  setShowModal,
}) => {
  const handleShowDetails = (todo: Todo) => {
    setShowModal(true);

    setSelectedTodo(todo);
  };

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
        {todos && todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={selectedTodo?.id === todo.id
              ? 'has-background-info-light' : ''}
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
              <p className={todo.completed
                ? 'has-text-success' : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  handleShowDetails(todo);
                }}
              >
                <span className="icon">
                  <i className={selectedTodo?.id === todo.id
                    ? 'far fa-eye-slash' : 'far fa-eye'}
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
