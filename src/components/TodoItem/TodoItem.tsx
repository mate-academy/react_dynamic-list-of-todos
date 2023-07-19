import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  selectedTodo: Todo | null,
  onTodoSelect: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onTodoSelect,
}) => {
  const selected = selectedTodo?.id === todo.id;

  return (
    <tr
      data-cy="todo"
      className={
        classNames({
          'has-background-info-light': selected,
        })
      }
    >
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
        <p className={classNames({
          'has-text-danger': !todo.completed,
          'has-text-success': todo.completed,
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
          onClick={() => onTodoSelect(todo)}

        >
          <span className="icon">
            <i className={
              classNames('fas', {
                'fa-eye-slash': selected,
                'fa-eye': !selected,
              })
            }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
