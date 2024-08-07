import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  setUserId: (v: number) => void;
  setShowModal: (v: boolean) => void;
  setSelectedTodo: (v: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setUserId,
  setShowModal,
  setSelectedTodo,
  selectedTodo,
}) => {
  const { userId, id, title, completed } = todo;
  const handleClick = () => {
    setUserId(userId);
    setSelectedTodo(todo);
    setShowModal(true);
  };

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': selectedTodo?.id === id })}
    >
      <td>{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className={cn('is-vcentered', { 'is-expanded': true })}>
        <p
          className={cn({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className={cn('has-text-right', 'is-vcentered')}>
        <button
          onClick={handleClick}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            {false ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i
                className={cn('far', {
                  'fa-eye-slash': selectedTodo?.id === id,
                  'fa-eye': selectedTodo?.id !== id,
                })}
              />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
