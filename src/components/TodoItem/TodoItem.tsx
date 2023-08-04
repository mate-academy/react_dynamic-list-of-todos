import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setShowModal: (status: boolean) => void,
  setPickedTodo: (todo: Todo) => void,
};

export const TodoItem:React.FC<Props> = ({
  todo,
  setShowModal,
  setPickedTodo,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const handleClick = () => {
    setPickedTodo(todo);
    setShowModal(true);
  };

  return (
    <tr
      data-cy="todo"
      className=""
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
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
          onClick={handleClick}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
