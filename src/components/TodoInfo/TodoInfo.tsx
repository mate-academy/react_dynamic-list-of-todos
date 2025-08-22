import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  handleChoosenDataTodo: (todo: Todo) => void;
  showEyeButton: boolean;
  clickedTodoId: number | null;
};

export const Todoinfo: React.FC<Props> = ({
  todo,
  handleChoosenDataTodo,
  showEyeButton,
  clickedTodoId,
}) => {
  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered is-expanded">
        {todo.completed && (
          <span className="icon">
            <i className="fas fa-check" data-cy="iconCompleted" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={cn('has-text-success', {
            'has-text-danger': !todo.completed,
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
          onClick={() => {
            handleChoosenDataTodo(todo);
          }}
        >
          <span className="icon">
            {!showEyeButton && todo.id === clickedTodoId ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
            {/* <i
              className={cn('far', {
                'fa-eye': showEyeButton && todo.id === idTodo,
                'fa-eye-slash': !showEyeButton && todo.id === idTodo,
              })}
            /> */}
          </span>
        </button>
      </td>
    </tr>
  );
};
