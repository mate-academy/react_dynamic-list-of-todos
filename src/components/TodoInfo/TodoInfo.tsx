import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo
  selectedTodo: Todo | null,
  onSelectedTodoChange: (arg: Todo) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodo,
  onSelectedTodoChange,
}) => {
  const {
    id,
    title,
    completed,
    // userId,
  } = todo;

  const handleSelectedTodo = () => {
    onSelectedTodoChange(todo);
  };

  const isSelected = selectedTodo?.id === id;

  return (
    <tr data-cy="todo" className="" key={id}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
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
          onClick={handleSelectedTodo}
        >
          <span className="icon">
            {isSelected
              ? <i className="far fa-eye-slash" />
              : <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
};
