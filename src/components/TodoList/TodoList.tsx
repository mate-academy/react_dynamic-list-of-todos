import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todo: Todo | null;
  onTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  todo,
  onTodo,
}) => {
  const selectedTodoId = todo ? todo.id : 0;

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
        {todos.map(currentTodo => (
          <tr
            data-cy="todo"
            key={currentTodo.id}
            className={currentTodo.id === selectedTodoId
              ? 'has-background-info-light'
              : ''}
          >
            <td className="is-vcentered">{currentTodo.id}</td>
            <td className="is-vcentered">
              {currentTodo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={currentTodo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {currentTodo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onTodo(currentTodo)}
              >
                <span className="icon">
                  <i className={currentTodo.id === selectedTodoId
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
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
