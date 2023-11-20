import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelect = () => { },
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
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td
              className="is-vcentered"
            >
              {todo.id}
            </td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              {todo.completed ? (
                <p className="has-text-success">
                  {todo.title}
                </p>
              ) : (
                <p className="has-text-danger">
                  {todo.title}
                </p>
              )}

            </td>
            <td className="has-text-right is-vcentered">
              {todo.id === selectedTodoId ? (
                <button
                  onClick={() => onSelect(null)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => onSelect(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
