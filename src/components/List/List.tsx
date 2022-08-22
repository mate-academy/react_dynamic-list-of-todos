import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  openedTodoId: number | null;
  onClick: (todo: Todo) => void;
  todo: Todo;
};

export const List: React.FC<Props> = ({ openedTodoId, onClick, todo }) => {
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
        <p
          className={classNames(
            {
              'has-text-success': todo.completed,
              'has-text-danger': !todo.completed,
            },
          )}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onClick(todo)}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye-slash': openedTodoId === todo.id,
                'fa-eye': openedTodoId !== todo.id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </>
  );
};
