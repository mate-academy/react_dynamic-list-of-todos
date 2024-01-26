import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../Store/Store';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodosContext);

  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn(
        { 'has-background-info-light': selectedTodo?.id === todo?.id },
      )}
    >
      <td className="is-vcentered">
        {id}
      </td>

      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={cn(
          { 'has-text-success': completed, 'has-text-danger': !completed },
        )}
        >
          {title}
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
              {
                'fa-eye-slash': selectedTodo?.id === todo?.id, // is it possible to simplify these lines?
                'fa-eye': selectedTodo?.id !== todo?.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
