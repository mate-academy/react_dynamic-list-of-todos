/* eslint-disable no-console */

import {
  ChangeEvent,
  FC, memo, useState,
} from 'react';
import classNames from 'classnames';
import { useSelectedUserIdContext } from '../../contexts/SelectedUserIdContext';
import { updateTodo } from '../../api/api';

type Props = Omit<Todo, 'id'>;

export const TodoItem: FC<Props> = memo(({
  userId, title, completed,
}) => {
  const [isChecked, setChecked] = useState(completed);
  const {
    selectedUserId,
    setSelectedUserId,
  } = useSelectedUserIdContext();

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.checked;

    setChecked(result);
    updateTodo(userId, result)
      .then(console.log)
      .catch(console.warn);
  };

  return (
    <li className={classNames(
      'TodoList__item',
      {
        'TodoList__item--checked': isChecked,
        'TodoList__item--unchecked': !isChecked,
      },
    )}
    >
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckBoxChange}
        />

        <p>{title}</p>
      </label>

      <button
        className={classNames(
          'button',
          'TodoList__user-button',
          { 'TodoList__user-button--selected': selectedUserId === userId },
        )}
        type="button"
        onClick={() => setSelectedUserId(userId)}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
});
