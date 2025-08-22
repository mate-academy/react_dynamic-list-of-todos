import { Todo } from '../../types/Todo';
import cn from 'classnames';

type TodoItemProps = {
  todo: Todo;
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo) => void;
};
function TodoItem({ todo, selectedTodo, selectTodo }: TodoItemProps) {
  return (
    <tr data-cy="todo" className="">
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
          className={cn({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          <span className="icon" onClick={() => selectTodo(todo)}>
            <i
              className={cn('far', {
                'fa-eye': !selectedTodo || todo.id !== selectedTodo.id,
                'fa-eye-slash': selectedTodo && todo.id === selectedTodo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
}

export default TodoItem;
