import React from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  selectTodo: (todoId: Todo | null) => void
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectTodo,
  selectedTodo,
}) => {
  return (
    <>
      <tr key={todo.id} data-cy="todo" className="">
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
              'has-text-link': todo.completed === true,
              'has-text-danger': todo.completed === false,
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
              onClick={() => selectTodo(null)}
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
              onClick={() => selectTodo(todo)}
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          )}
        </td>
      </tr>
    </>
  );
};
