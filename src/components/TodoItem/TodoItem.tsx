import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const TodoItem: FC<Props> = ({
  todo,
  setSelectedTodo,
  selectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
    >
      <td className="is-vcentered">
        {id}
      </td>
      <td className="is-vcentered" />

      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': completed,
          'has-text-danger': !completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        {selectedTodo?.id === id
          ? (
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelectedTodo(null)}
            >
              <span className="icon">
                <i className="far fa-eye-slash" />
              </span>
            </button>
          )
          : (
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelectedTodo(todo)}
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          )}
      </td>
    </tr>
  );
};
