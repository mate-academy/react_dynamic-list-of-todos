import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  item: Todo;
  activeTodo: undefined | Todo;
  setActiveTodo: Dispatch<SetStateAction<undefined | Todo>>;
}

export const TodoItem: React.FC<Props> = ({
  item,
  activeTodo,
  setActiveTodo,
}) => {
  const active = item.id === activeTodo?.id;

  const handleClick = () => {
    setActiveTodo(item);
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': item.completed })}
    >
      <td className="is-vcentered">{item.id}</td>
      {!item.completed ? (
        <td className="is-vcentered" />
      ) : (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': item.completed,
            'has-text-danger': !item.completed,
          })}
        >
          {item.title}
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
            <i
              className={classNames('far', {
                'fa-eye': !active,
                'fa-eye-slash': active,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
