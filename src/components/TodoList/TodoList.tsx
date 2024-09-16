import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onUserChoose: (id: number) => void;
  onChangeActiveTodo: (todo: Todo) => void;
  activeTodo: Todo;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onUserChoose,
  onChangeActiveTodo,
  activeTodo,
}) => {
  const handleTodoClick = (userId: number, todo: Todo) => {
    onUserChoose(userId);
    onChangeActiveTodo(todo);
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            {...(activeTodo.id === todo.id && {
              className: 'has-background-info-light',
            })}
            key={todo.id}
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
                className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleTodoClick(todo.userId, todo)}
              >
                <span className="icon">
                  <i
                    className={`far ${activeTodo.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
