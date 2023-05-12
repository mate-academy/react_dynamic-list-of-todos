import { FC, memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelect: (todo: Todo | null) => void;
}

export const TodoItem: FC<Props> = memo(({
  todo,
  selectedTodo,
  onSelect,
}) => {
  return (
    <tr data-cy="todo" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !todo.completed,
          'has-text-success': todo.completed,
        })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        {selectedTodo?.id === todo.id ? (
          <button
            data-cy="selectButton"
            className="button is-link"
            type="button"
            onClick={() => onSelect(null)}
          >
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        ) : (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => {
              onSelect(todo);
            }}
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        )}
      </td>
    </tr>
  );
});
