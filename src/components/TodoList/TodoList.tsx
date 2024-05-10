import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  targetTodo: Todo | null;
  todos: Todo[];
  onOpen: (batata: Todo | null) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  targetTodo,
  todos,
  onOpen,
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
            <td className="is-vcentered is-expanded">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered">
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
                onClick={() => onOpen(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={
                      targetTodo?.id === todo.id
                        ? 'fa fa-eye-slash'
                        : 'fa fa-eye'
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
