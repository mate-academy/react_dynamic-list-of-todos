import { Todo } from '../../types/Todo';
import React from 'react';
import cls from 'classnames';

export interface Props {
  todoItem: Todo;
  setSelectTodo: (todo: Todo | null) => void;
  selectTodo: Todo | null;
}

export const TodoItem: React.FC<Props> = ({
  todoItem,
  setSelectTodo,
  selectTodo,
}) => {
  const { id, title, completed } = todoItem;

  return (
    <tbody>
      <tr
        data-cy="todo"
        className={cls({ 'has-background-info-light': selectTodo?.id === id })}
        key={id}
      >
        <td className="is-vcentered">{id}</td>
        <td className="is-vcentered">
          {completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
        </td>
        <td className="is-vcentered is-expanded">
          <p
            className={cls({
              'has-text-success': completed,
              'has-text-danger': !completed,
            })}
          >
            {title}
          </p>
        </td>

        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => setSelectTodo(todoItem)}
          >
            <span className="icon">
              <i
                className={cls('far', {
                  'fa-eye-slash': selectTodo?.id === id,
                  'fa-eye': selectTodo?.id !== id,
                })}
              />
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  );
};
