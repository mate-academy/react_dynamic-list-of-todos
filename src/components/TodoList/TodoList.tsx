import React, { useCallback } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId?: number;
  onSelected: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelected,
  selectedTodoId = 0,
}) => {
  const handleButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, todo: Todo) => {
      event.preventDefault();
      onSelected(todo);
    },
    [onSelected],
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={
              selectedTodoId === todo.id ? 'has-background-info-light' : ''
            }
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
                onClick={event => handleButton(event, todo)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodoId === todo.id
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
