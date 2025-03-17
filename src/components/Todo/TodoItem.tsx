import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  getTodo: (todo: Todo) => void;
  isModalShown: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, getTodo, isModalShown }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handlerMoreInfo = () => {
    getTodo(todo);
    setIsButtonActive(true);
  };

  useEffect(() => {
    if (!isModalShown) {
      setIsButtonActive(false);
    }
  }, [isModalShown]);

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isButtonActive })}
    >
      <td className="is-vcentered">{todo.id}</td>

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
        <p
          className={classNames({
            'has-text-danger': todo.completed === false,
            'has-text-success': todo.completed === true,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          onClick={handlerMoreInfo}
          className="button"
          type="button"
        >
          <span className="icon">
            {isButtonActive ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye " />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
