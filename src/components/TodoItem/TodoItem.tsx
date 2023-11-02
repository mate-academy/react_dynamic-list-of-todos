import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  selectedTodo: Todo | null,
  changeSelectedTodo: (value: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({
  selectedTodo,
  todo,
  changeSelectedTodo,
}) => {
  const { id, title, completed } = todo;
  const isTodoSelected = id === selectedTodo?.id;

  return (
    <tr data-cy="todo" className="">
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
          onClick={() => changeSelectedTodo(todo)}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye': !isTodoSelected,
                'fa-eye-slash': isTodoSelected,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
