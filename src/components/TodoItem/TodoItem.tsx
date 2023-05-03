import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  showModal: (todo: Todo) => void,
  selectedTodoId: number,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  showModal,
  selectedTodoId,
}) => {
  return (
    <tr
      data-cy="todo"
      className=""
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span data-cy="iconCompleted" className="icon">
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
          onClick={() => showModal(todo)}
        >
          <span className="icon">
            <i className={`far fa-eye${todo.id === selectedTodoId ? '-slash' : ''}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
