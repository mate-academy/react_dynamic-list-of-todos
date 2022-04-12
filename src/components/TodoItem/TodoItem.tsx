import {
  FC, memo, useContext, useState,
} from 'react';

import cn from 'classnames';

import { SelectUserIdContext } from '../../contexts/SelectUserIdContext';

type Props = Omit<Todo, 'id'>;

export const TodoItem: FC<Props> = memo(({
  userId, completed, title,
}) => {
  const { selectedUserId, setSelectedUserId } = useContext(SelectUserIdContext);
  const [checked, setChecked] = useState(completed);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <li className={cn('TodoList__item', {
      'TodoList__item--unchecked': !checked,
      'TodoList__item--checked': checked,
    })}
    >
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <p>{title}</p>
      </label>

      <button
        className={cn('TodoList__user-button', 'button', {
          'TodoList__user-button--selected': selectedUserId === userId,
        })}
        type="button"
        onClick={() => {
          setSelectedUserId(userId);
        }}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
});
