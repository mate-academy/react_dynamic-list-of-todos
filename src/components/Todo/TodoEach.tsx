import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  i: number,
  chosenTodo: Todo | null,
  handleChosenTodo: (todo: Todo) => void,
};

export const TodoEach: React.FC<Props> = ({
  todo,
  i,
  handleChosenTodo,
  chosenTodo,
}) => {
  const { completed, id, title } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">
        {i + 1}
      </td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames(
          {
            'has-text-danger': !completed,
            'has-text-success': completed,
          },
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
          onClick={() => {
            handleChosenTodo(todo);
          }}
        >
          <span className="icon">
            <i className={classNames('far',
              {
                'far fa-eye': chosenTodo?.id !== id,
                'fa-eye-slash': chosenTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
