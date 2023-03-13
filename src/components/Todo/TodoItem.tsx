import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  selectedTodo: Todo | null,
  openModal: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  openModal,
  selectedTodo,
}) => {
  const { id, completed, title } = todo;
  const selectTodo = (todoId: number) => {
    openModal(todoId);
  };

  return (
    <tr
      key={id}
      data-cy="todo"
    >
      <td className="is-vcentered">
        {id}
      </td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
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
          onClick={() => {
            selectTodo(id);
          }}
        >
          <span
            className="icon"
          >
            <i
              className={classNames(
                'far',
                'fa-eye',
                {
                  'fa-eye-slash': id === selectedTodo?.id,
                },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
