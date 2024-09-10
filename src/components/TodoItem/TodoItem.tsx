import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';
import React from 'react';

type TodoProps = {
  todo: Todo;
  isSelected: boolean;
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoItem: FC<TodoProps> = ({
  todo,
  isSelected,
  setSelectedTodo,
}) => {
  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                isSelected ? 'fa-eye-slash' : 'fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
