import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
  setIsModalActive: (isModalActive: boolean) => void;
  isModalActive: boolean;
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
  setIsModalActive,
  isModalActive,
  todo,
}) => {
  const handleSelectTodo = () => {
    setSelectedTodo(todo);
    setIsModalActive(false);

    setTimeout(() => {
      setIsModalActive(true);
    }, 100);
  };

  return (
    <tr
      data-cy="todo"
      className={classNames(
        selectedTodo?.id === todo?.id && isModalActive
          ? 'has-background-info-light'
          : '',
      )}
    >
      <td className="is-vcentered">{todo?.id}</td>
      <td className="is-vcentered">
        {todo?.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            todo?.completed ? 'has-text-success' : 'has-text-danger',
          )}
        >
          {todo?.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleSelectTodo}
        >
          <span className="icon">
            <i
              className={classNames(
                selectedTodo?.id === todo?.id && isModalActive
                  ? 'far fa-eye-slash'
                  : 'far fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
