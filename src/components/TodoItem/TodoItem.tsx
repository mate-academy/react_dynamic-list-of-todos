import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Prop = {
  todo: Todo;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoItem = ({ todo, selectedTodo, setSelectedTodo }: Prop) => {
  const isCompleted = todo.completed;
  const isSelectedTodo = selectedTodo?.id === todo.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelectedTodo,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {isCompleted && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !isCompleted,
            'has-text-success': isCompleted,
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
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
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
