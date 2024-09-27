import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  handleEyeClick: (todoId: number) => void;
  selectedTodoId: number | null;
};

export const TodoPost: React.FC<Props> = ({
  todo,
  handleEyeClick,
  selectedTodoId,
}) => {
  return (
    <tr data-cy="todo" className="" key={todo.id}>
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
          onClick={() => {
            handleEyeClick(todo.id);
          }}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': selectedTodoId !== todo.id,
                'fa-eye-slash': selectedTodoId === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
