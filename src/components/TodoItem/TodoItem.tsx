import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  modalTodo: Todo | null;
  setModalTodo: (modal: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  modalTodo,
  setModalTodo,
}) => (
  <tr data-cy="todo" className="" key={todo.id}>
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered">
      {todo.completed && (
        <span className="icon" data-cy="iconCompleted">
          <i className="fas fa-check" />
        </span>
      )}
    </td>
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
        className="button"
        type="button"
        onClick={() => setModalTodo(todo)}
      >
        <span className="icon">
          <i
            className={classNames(
              'far',
              modalTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye',
            )}
          />
        </span>
      </button>
    </td>
  </tr>
);
