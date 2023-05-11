import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onSelectedTodo: (todo: Todo) => void;
  clickedTodoId: number;
}

export const TodoItem: FC<Props> = ({
  todo,
  onSelectedTodo,
  clickedTodoId,
}: Props) => {
  return (
    <>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {
          todo.completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )
        }
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn({
          'has-text-danger': !todo.completed,
          'has-text-success': todo.completed,
        })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelectedTodo(todo)}
        >
          <span className="icon">
            <i className={cn(
              { 'fas fa-eye': clickedTodoId !== todo.id },
              { 'fas fa-eye-slash': clickedTodoId === todo.id },
            )}
            />
          </span>
        </button>
      </td>
    </>
  );
};
