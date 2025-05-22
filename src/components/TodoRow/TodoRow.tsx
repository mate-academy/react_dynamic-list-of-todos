import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  showTodoModal: (
    todo: Todo,
    setButtonPressed: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
};

export const TodoRow: React.FC<Props> = React.memo(
  ({ todo, showTodoModal }) => {
    const [buttonPressed, setButtonPressed] = useState(false);

    function handleButtonPress(): void {
      setButtonPressed(true);
      showTodoModal(todo, setButtonPressed);
    }

    return (
      <tr
        data-cy="todo"
        className={classNames({
          'has-background-info-light': buttonPressed,
        })}
        key={todo.id}
      >
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
            className={classNames(
              'is-vcentered',
              {
                'has-text-danger': !todo.completed,
              },
              {
                'has-text-success': todo.completed,
              },
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
            onClick={handleButtonPress}
          >
            <span className="icon">
              <i
                className={classNames(
                  'far',
                  { 'fa-eye': !buttonPressed },
                  { 'fa-eye-slash': buttonPressed },
                )}
              />
            </span>
          </button>
        </td>
      </tr>
    );
  },
);

TodoRow.displayName = 'TodoRow';
