import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  setSelectedTodo,
  setIsModalOpen,
}) => {
  function handlerSelectButton() {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  }

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handlerSelectButton}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
