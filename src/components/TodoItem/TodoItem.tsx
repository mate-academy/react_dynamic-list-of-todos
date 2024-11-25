import cn from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelectedTodo: (todo: Todo) => void;
};

const TodoItem: React.FC<Props> = ({ todo, selectedTodo, onSelectedTodo }) => {
  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodo?.id === todo.id,
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
          onClick={() => onSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': selectedTodo?.id !== todo.id,
                'fa-eye-slash': selectedTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
