import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  selectedTodo: Todo | null,
  handleSelectTodo: (todo: Todo) => void
}

export const TodoItem: React.FC<Props> = (
  {
    todo,
    selectedTodo,
    handleSelectTodo,
  },
) => {
  const isSelectedTodoId = selectedTodo === todo;

  return (
    <tr
      data-cy="todo"
      className={cn(
        { 'has-background-info-light': isSelectedTodoId },
      )}
      key={todo.id}
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

        <p className={cn(
          { 'has-text-danger': !todo.completed },
          { 'has-text-success': todo.completed },
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
          onClick={() => handleSelectTodo(todo)}
        >
          <span className="icon">
            <i className={cn(
              { 'far fa-eye': !isSelectedTodoId },
              { 'far fa-eye-slash': isSelectedTodoId },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
