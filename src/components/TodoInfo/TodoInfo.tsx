import React from 'react';
import classnames from 'classnames';

type Props = {
  id: number;
  userId: number;
  completed: boolean;
  isSelected: boolean;
  title: string;
  onUserSelect: (value: number) => void;
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({
    id,
    userId,
    completed,
    isSelected,
    title,
    onUserSelect,
  }) => (
    <li
      className={classnames(
        'TodoList__item',
        {
          'TodoList__item--unchecked': !completed,
          'TodoList__item--checked': completed,
        },
      )}
    >
      <label htmlFor={`${id}`}>
        <input
          type="checkbox"
          checked={completed}
          readOnly
          id={`${id}`}
        />
        <p>{title}</p>
      </label>

      <button
        className={classnames(
          'TodoList__user-button',
          'button',
          {
            'TodoList__user-button--selected': isSelected,
          },
        )}
        type="button"
        onClick={() => onUserSelect(userId)}
      >
        {`User ${userId}`}
      </button>
    </li>
  ),
);
