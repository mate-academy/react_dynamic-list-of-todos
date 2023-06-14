import { FC } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelect: (value: Todo | null) => void;
}

export const TodoItem: FC<Props> = ({
  todo,
  selectedTodo,
  onSelect,
}) => {
  const isTodoSelected = selectedTodo && selectedTodo.id === todo.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isTodoSelected,
      })}
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
          onClick={() => {
            onSelect(todo);
          }}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': isTodoSelected,
                'fa-eye': !isTodoSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
