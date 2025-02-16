import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  openModal,
  setOpenModal,
  setTodo,
}) => {
  return (
    <tr data-cy="todo" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>
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
          onClick={() => {
            setOpenModal(true);
            setTodo(todo);
          }}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !openModal,
                'fa-eye-slash': openModal,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
