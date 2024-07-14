import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

type TodoItemProps = {
  todo: Todo;
  selectedIdTodo: number | undefined;
  onSelectedTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  selectedIdTodo,
  onSelectedTodo,
}) => {
  const { id, title, completed } = todo;
  const uniqueKey = uuidv4();

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedIdTodo === id,
      })}
      key={uniqueKey}
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
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn({
                'far fa-eye-slash': selectedIdTodo === id,
                'far fa-eye': selectedIdTodo !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
