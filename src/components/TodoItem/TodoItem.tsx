import React from 'react';
import cn from 'classnames';
import { useTodos } from '../../utils/TodosContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useTodos();
  const isTodoSelected = selectedTodo?.id === todo.id;

  return (
    <tr data-cy="todo" className="">
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
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': isTodoSelected,
                'fa-eye': !isTodoSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
