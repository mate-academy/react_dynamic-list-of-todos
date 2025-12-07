import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
};

export const TodoRow: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo,
}) => {
  const handleSelected = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedTodo(todo);
  };

  return (
    <>
      <tr
        data-cy="todo"
        className={classNames({
          'has-background-info-light': selectedTodo && selectedTodo.id === todo.id
        })}
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
            className={classNames({
              'has-text-success': todo.completed,
              'has-text-danger': !todo.completed
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
            onClick={handleSelected}
          >
            <span className="icon">
              
              <i
                className={classNames('far', {
                  'fa-eye-slash': selectedTodo && selectedTodo.id === todo.id,
                  'fa-eye': !selectedTodo || selectedTodo.id !== todo.id
                })}
              />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
