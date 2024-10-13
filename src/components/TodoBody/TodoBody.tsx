import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo;
  onChoosingTodo: (todo: Todo) => void;
  chosenTodoId?: number;
}

export const TodoBody: React.FC<Props> = ({
  todo,
  onChoosingTodo,
  chosenTodoId,
}) => {
  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': chosenTodoId === todo.id })}
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
          className={cn({
            'has-text-danger': !todo.completed,

            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={() => onChoosingTodo(todo)}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': chosenTodoId !== todo.id,
                'fa-eye-slash': chosenTodoId === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
