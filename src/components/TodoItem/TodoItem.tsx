// TodoItem.tsx
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelected: boolean;
  onSelect: (todo: Todo | null) => void;
  isOpenModal: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isSelected,
  onSelect,
  isOpenModal,
}) => {
  const handleTodoChosen = () => {
    if (!isOpenModal) {
      onSelect(todo);
    }
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={handleTodoChosen}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
