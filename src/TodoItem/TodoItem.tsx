import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  handleSelectTodo: (todoId: number) => void;
  selectedTodoId: number | null;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodoId,
  handleSelectTodo,
}) => {
  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedTodoId === todo.id,
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
        <p className={classNames({
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
          onClick={() => (handleSelectTodo(todo.id))}
        >
          {selectedTodoId === todo.id ? (
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          ) : (
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          )}
        </button>
      </td>
    </tr>
  );
};
