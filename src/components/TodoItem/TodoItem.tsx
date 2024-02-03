import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/TodoProvider';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { selectTodo: onTodoSelect, selectedTodo } = useContext(TodosContext);
  const { completed, title } = todo;

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">
        {todo.id}
      </td>

      <td className="is-vcentered">
        {completed
          && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
      </td>

      <td className="is-vcentered">
        <p className={cn({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={() => onTodoSelect(todo)}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye-slash': selectedTodo && selectedTodo.id === todo.id,
              'fa-eye': !selectedTodo || selectedTodo.id !== todo.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
