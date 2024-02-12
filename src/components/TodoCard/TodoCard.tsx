import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../contexts/TodoContext';

interface Props {
  todo: Todo
}

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  const { id, completed, title } = todo;
  const { isSelected } = selectedTodo;

  const selectedTodoHandler = () => {
    setSelectedTodo({
      todo,
      isSelected: true,
    });
  };

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isSelected })}
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
          className={cn({
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={selectedTodoHandler}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
