import { memo } from 'react';
import classnames from 'classnames';
import { TodoItemProps } from '../../types/TodoProps';

export const TodoItem: React.FC<TodoItemProps> = memo(
  ({
    todo,
    selectedTodoId,
    showTodoInfo,
  }) => (
    <tr
      data-cy="todo"
      className={classnames({
        'has-background-info-light': selectedTodoId === todo.id,
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => showTodoInfo(todo)}
        >
          <span className="icon">
            <i className={classnames(
              'far',
              {
                'fa-eye': selectedTodoId !== todo.id,
                'fa-eye-slash': selectedTodoId === todo.id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  ),
);
