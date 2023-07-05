import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  setSelectedTodo,
  selectedTodo,
}) => {
  const isSelected = selectedTodo?.id === todo.id;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      {!todo.completed
        ? <td className="is-vcentered" />
        : (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        )}
      <td className="is-vcentered is-expanded">
        <p className={cn(
          { 'has-text-success': todo.completed },
          { 'has-text-danger': !todo.completed },
        )}
        >
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
            <i className={cn('far',
              { 'fa-eye': !isSelected },
              { 'fa-eye-slash': isSelected })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
