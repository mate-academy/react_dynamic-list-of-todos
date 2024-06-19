import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useState } from 'react';

type Props = {
  todo: Todo;
  selectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectTodo,
  selectedTodo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectButton = () => {
    selectTodo(todo);
    setIsOpen(!isOpen);
  };

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
        <p
          className={classNames(
            todo.completed ? 'has-text-success' : 'has-text-danger',
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
          onClick={() => handleSelectButton()}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                selectedTodo === todo ? 'fa-eye-slash' : 'fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
