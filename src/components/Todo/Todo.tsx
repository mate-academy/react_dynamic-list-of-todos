import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

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
        key={todo.id}
        data-cy="todo"
        className={
          selectedTodo && selectedTodo.id === todo.id
            ? 'has-background-info-light'
            : ''
        }
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
            className={todo.completed ? 'has-text-success' : 'has-text-danger'}
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
                className={`far fa-eye${selectedTodo && selectedTodo.id === todo.id ? '-slash' : ''}`}
              />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
