import {
  FC,
  useCallback,
  useState,
} from 'react';
import './TodoItem.scss';
import cn from 'classnames';

type Props = {
  todo: Todo;
  selectedUserId: number,
  selectNewUser: (x: number) => void;
};

export const TodoItem: FC<Props> = ({
  todo,
  selectedUserId,
  selectNewUser,
}) => {
  const [checked, setChecked] = useState(todo.completed);

  const onChecked = useCallback(() => {
    setChecked(prev => !prev);
  }, [checked]);

  return (
    <li
      className={cn(
        'TodoItem',
        {
          'TodoItem--checked': checked,
          'TodoItem--unchecked': !checked,
        },
      )}
    >
      <label>
        <input
          type="checkbox"
          checked={checked}
          readOnly
          onClick={onChecked}
        />
        <p>{todo.title}</p>
      </label>

      <button
        className={cn(
          'TodoItem__user-button', 'button',
          {
            'TodoItem__user-button--selected': todo.userId === selectedUserId,
          },
        )}
        // className="
        //   TodoItem__user-button
        //   TodoItem__user-button--selected
        //   button
        // "
        type="button"
        onClick={() => selectNewUser(todo.userId)}
        data-cy="userButton"
      >
        {`User #${todo.userId}`}
      </button>
    </li>
  );
};
