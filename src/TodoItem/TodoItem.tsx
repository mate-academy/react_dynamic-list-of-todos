import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  selectedTodo: Todo | null,
  handleTodo: (todo: Todo) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  handleTodo,
}) => {
  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodo === todo,
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
        <p className={cn({
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
            handleTodo(todo);
          }}
        >
          <span className="icon">
            <i className={cn('far', { 'fa-eye': selectedTodo !== todo }, {
              'fa-eye-slash': selectedTodo === todo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
