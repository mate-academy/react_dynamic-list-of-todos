import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setUserId: (v: number) => void;
  setShowModal: (v: boolean) => void;
  setSelectedTodo: (v: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setUserId,
  setShowModal,
  setSelectedTodo,
}) => {
  const handleClick = () => {
    setUserId(todo.userId);
    setSelectedTodo(todo);
    setShowModal(true);
  };

  return (
    <tr data-cy="todo">
      <td>{todo.id}</td>
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={handleClick}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
