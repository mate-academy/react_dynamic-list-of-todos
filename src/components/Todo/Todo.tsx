import { FC, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => setIsClicked(!isClicked);

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        <span className="icon" data-cy="iconCompleted">
          {completed && <i className="fas fa-check" />}
        </span>
      </td>
      <td className="is-vcentered is-expanded">
        {isClicked
          && (
            <TodoModal
              handler={handleClick}
              todo={todo}
            />
          )}
        <p
          className={classNames({
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={handleClick}
        >
          <span className="icon">
            {!isClicked && <i className="far fa-eye" />}
            {isClicked && <i className="far fa-eye-slash" />}

          </span>
        </button>
      </td>
    </tr>
  );
};
