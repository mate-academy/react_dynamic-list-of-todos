import {
  FC,
  useCallback,
  useState,
} from 'react';
import './TodoItem.scss';
import cn from 'classnames';

type Props = {
  todo: Todo;
  selectNewUser: (x: number) => void;
};

export const TodoItem: FC<Props> = ({
  todo,
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
        className="
          TodoItem__user-button
          TodoItem__user-button--selected
          button
        "
        type="button"
        onClick={() => selectNewUser(todo.userId)}
        data-cy="userButton"
      >
        {`User #${todo.userId}`}
      </button>
    </li>
  );
};
