import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
  setIsTodoModalShown: (condition: boolean) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo,
  setIsTodoModalShown,
}) => {
  const handleSelectButton = () => {
    setSelectedTodo(todo);
    setIsTodoModalShown(true);
  };

  return (
    <tr data-cy="todo" className="" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
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
          onClick={handleSelectButton}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': todo !== selectedTodo,
                'fa-eye-slash': todo === selectedTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
