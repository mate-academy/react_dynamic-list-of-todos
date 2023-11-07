import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { HandleClickParams } from '../../types/HandleClickParams';

type Props = {
  todo: Todo;
  selectedTodoId: number;
  handleSelectTodo: (values: HandleClickParams) => void;
};

export const TableRowTodo: React.FC<Props> = ({
  todo,
  selectedTodoId,
  handleSelectTodo,
}) => {
  const {
    id,
    completed,
    title,
    userId,
  } = todo;

  const isSelectedTodo = selectedTodoId === id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodoId === id,
      })}
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
          className={cn({
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
          onClick={() => handleSelectTodo({
            boolean: true,
            userId,
            todo,
          })}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSelectedTodo,
                'fa-eye-slash': isSelectedTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
