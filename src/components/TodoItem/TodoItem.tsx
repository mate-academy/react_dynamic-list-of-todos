import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onHandleModal: (todo: Todo) => void;
  selectedTodo: Todo | null,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onHandleModal,
  selectedTodo,
}) => {
  return (
    <tr
      data-cy="todo"
      key={todo.id}
    >
      <td className="is-vcentered">
        {todo.id}
      </td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            'has-text-success',
            { 'has-text-danger': !todo.completed },
          )}
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
            onHandleModal(todo);
          }}
        >
          <span className="icon">
            <i className={classNames({
              'far fa-eye': selectedTodo !== todo,
              'far fa-eye-slash': selectedTodo === todo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
