import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  setTodo: (todo: Todo) => void;
  chooseTodo: Todo | null;
}

export const TodoCard: React.FC<Props> = ({ todo, setTodo, chooseTodo }) => {
  function handleEye() {
    setTodo(todo);
  }

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
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
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleEye}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye': chooseTodo !== todo,
                'far fa-eye-slash': chooseTodo && chooseTodo.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
