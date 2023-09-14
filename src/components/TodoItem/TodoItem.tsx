import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
  } = todo;

  const { showedTodo, setShowedTodo } = useContext(TodoContext);

  const handleMouseEnter = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.currentTarget.classList.add('has-background-info-light');
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.currentTarget.classList.remove('has-background-info-light');
  };

  return (
    <tr
      data-cy="todo"
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setShowedTodo(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye-slash': showedTodo?.id === id,
              'fa-eye': showedTodo?.id !== id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
