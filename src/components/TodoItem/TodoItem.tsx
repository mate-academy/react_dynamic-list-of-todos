import { FC } from 'react';

import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoId: number;
  openModal: () => void;
};

export const TodoItem: FC<Props> = ({ todo, selectedTodoId, openModal }) => {
  const { id, title, completed } = todo;
  const isOpened = selectedTodoId === id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isOpened,
      })}
    >
      <td className="is-vcentered">{id}</td>

      <td className="is-vcentered">
        {completed ? (
          <span data-cy="iconCompleted">{'\u2705'}</span>
        ) : (
          <span>{'\u{274C}'}</span>
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
          className="button is-small is-info is-light"
          type="button"
          onClick={openModal}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isOpened,
                'fa-eye-slash': isOpened,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
