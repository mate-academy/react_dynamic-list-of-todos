import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type TodoRowProps = {
  todo: Todo;
  selectedTodo: Todo | null;
  handleModalChange: (todo: Todo | null) => void;
};

const TodoRow: React.FC<TodoRowProps> = ({
  todo,
  selectedTodo,
  handleModalChange,
}) => {
  return (
    <tr data-cy="todo" className="" key={todo.id}>
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
          onClick={() => handleModalChange(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': todo === selectedTodo,
                'fa-eye': todo !== selectedTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TodoRow;
