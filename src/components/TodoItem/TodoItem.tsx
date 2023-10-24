import React from "react";
import { Todo } from "../../types/Todo"
import cn from 'classnames';


interface Props {
  todo: Todo;
  onSelect?: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelect,
  selectedTodo,
}) => {
  return (
    <tr
      data-cy="todo"
      key={todo.id}
      className={cn({
        'has-background-info-light': selectedTodo === todo,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className='fas fa-check' />
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
          onClick={() => onSelect && onSelect(todo)} 
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': selectedTodo === todo,
                'fa-eye': selectedTodo !== todo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  )
}
