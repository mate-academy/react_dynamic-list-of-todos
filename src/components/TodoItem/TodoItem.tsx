import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props{
  item: Todo;
  handleClick: (item: Todo) => void
  activeItem: Todo
}

export const TodoItem: React.FC<Props> = ({
  item, handleClick, activeItem,
}) => {
  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': activeItem?.id === item.id,
      })}
    >
      <td className="is-vcentered">{item.id}</td>
      {!item.completed
        ? (
          <td className="is-vcentered" />
        )
        : (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        )}
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !item.completed,
            'has-text-success': item.completed,
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
          onClick={() => handleClick(item)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': activeItem.id !== item.id,
              'fa-eye-slash': activeItem.id === item.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
