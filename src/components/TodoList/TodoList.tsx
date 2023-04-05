import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelectUser: (userId: number) => void;
  onSelectTodo: (todo: Todo) => void;
  onUserActive: (boolean: boolean) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectUser,
  onSelectTodo,
  onUserActive,
}) => {
  const handleClick = (userId: number, todo: Todo) => {
    onSelectUser(userId);
    onSelectTodo(todo);
    onUserActive(true);
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
        {todos
          .map((todo) => (
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleClick(todo.userId, todo)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
