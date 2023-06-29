import cn from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

interface Props{
  todo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  isSelectedTodo: boolean;
}

export const TodoItem:FC<Props> = ({
  todo,
  setSelectedTodo,
  isSelectedTodo,
}) => {
  const { title, id, completed } = todo;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={cn({ 'has-background-info-light': isSelectedTodo })}
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
        <p className={cn({
          'has-text-success': completed,
          'has-text-danger': !completed,
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
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': !isSelectedTodo,
              'fa-eye-slash': isSelectedTodo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
