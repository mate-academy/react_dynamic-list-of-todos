import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  showSelectedTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  showSelectedTodo,
  selectedTodo,
}) => {
  const isSelectedTodo = todo.id === selectedTodo?.id;

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo?.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        {todo.completed ? (
          <p className="has-text-success">{todo.title}</p>
        ) : (
          <p className="has-text-danger">{todo.title}</p>
        )}
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => showSelectedTodo(todo)}
        >
          <span className="icon">
            {isSelectedTodo ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
