import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  setSelectedTodo,
  selectedTodo,
}) => {
  const { id, title, completed } = todo;
  const isSelected = selectedTodo?.id === id;

  const handleClickShowButton = () => {
    setSelectedTodo(todo);
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">
        {id}
      </td>
      {completed
        ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        ) : (
          <td className="is-vcentered" />
        )}
      <td
        className="is-vcentered is-expanded"
      >
        <p className={classNames(
          { 'has-text-danger': !completed },
          { 'has-text-success': completed },
        )}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleClickShowButton}
        >
          <span className="icon">
            <i
              className={classNames('far',
                { 'fa-eye': !isSelected },
                { 'fa-eye-slash': isSelected })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
