import { memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  onButtonClick: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = memo(({
  todo,
  selectedTodo,
  onButtonClick,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className=""
      key={id}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
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
          onClick={() => onButtonClick(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': id !== selectedTodo?.id,
              'fa-eye-slash': id === selectedTodo?.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
