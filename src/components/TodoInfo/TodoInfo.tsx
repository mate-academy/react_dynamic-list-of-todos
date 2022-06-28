import cn from 'classnames';
import { useState } from 'react';

interface Props {
  id: number
  completed: boolean;
  title: string;
  userId: number;
  onSelect: (userId: number) => void;
  selectedId: number;
  onSelectId: (id: number) => void;
}

export const TodoInfo: React.FC<Props> = ({
  id,
  completed,
  title,
  userId,
  onSelect,
  selectedId,
  onSelectId,
}) => {
  const [isTaskComplete, setIsTaskComplete] = useState(completed);

  return (
    <li
      className={cn(
        'TodoList__item',
        { 'TodoList__item--unchecked': !isTaskComplete },
        { 'TodoList__item--checked': isTaskComplete },
      )}
    >
      <label>
        <input
          type="checkbox"
          defaultChecked={isTaskComplete}
          onChange={() => setIsTaskComplete(!isTaskComplete)}
        />
        <p>{title}</p>
      </label>

      <button
        type="button"
        className={cn(
          'TodoList__user-button',
          'button',
          { 'TodoList__user-button--selected': selectedId === id },
        )}
        data-cy="userButton"
        onClick={() => {
          onSelect(userId);
          onSelectId(id);
        }}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
};
