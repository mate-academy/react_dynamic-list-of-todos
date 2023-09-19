import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setSelectedTodoId: (arg: number) => void;
  selectedTodo: Todo | undefined;
};

const determineTextClass = (completed: boolean) => classNames({
  'has-text-danger': !completed,
  'has-text-success': completed,
});

const determineIconClass = (isSelected: boolean) => classNames({
  'far fa-eye-slash': isSelected,
  'far fa-eye': !isSelected,
});

export const TodoItem: React.FC<Props> = ({
  todo,
  setSelectedTodoId,
  selectedTodo,
}) => {
  const { id, completed, title } = todo;

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={determineTextClass(completed)}>{title}</p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setSelectedTodoId(id)}
        >
          <span className="icon">
            <i className={determineIconClass(selectedTodo?.id === id)} />
          </span>
        </button>
      </td>
    </tr>
  );
};
