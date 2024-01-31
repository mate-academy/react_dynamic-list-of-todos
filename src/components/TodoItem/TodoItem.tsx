import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  completed: boolean,
  id: number,
  title: string,
  userId: number,
};

export const TodoItem: React.FC<Props> = ({
  completed, id, title, userId,
}) => {
  const {
    showModal,
    currentTodoId,
    handleShowModal,
    handleChangeUser,
    handleCurrentTodo,
  } = useContext(TodosContext);

  useEffect(() => {}, [currentTodoId]);

  const handleClick = () => {
    handleCurrentTodo(id);
    handleChangeUser(userId);
    handleShowModal();
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': showModal,
      })}
      key={id}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : ''}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className={classNames('is-vcentered', {
        completed: 'has-text-right',
      })}
      >
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleClick}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': currentTodoId !== id,
              'fa-eye-slash': currentTodoId === id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
