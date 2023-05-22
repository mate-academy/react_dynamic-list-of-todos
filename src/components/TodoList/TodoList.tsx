import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface PropsTodoList {
  todos: Todo[];
  openModal(todo: Todo): void;
  reset: Todo | null;
}

export const TodoList: React.FC<PropsTodoList> = ({
  todos,
  openModal,
  reset,
}) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleClickEyeButton = (todo: Todo) => {
    setSelectedId(todo.id);

    openModal(todo);
  };

  if (selectedId !== 0 && reset === null) {
    setSelectedId(0);
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const { id, completed, title } = todo;

          return (
            <tr
              data-cy="todo"
              className={
                cn({ 'has-background-info-light': selectedId === id })
              }
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={cn({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
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
                  onClick={() => handleClickEyeButton(todo)}
                >
                  <span
                    className="icon"
                  >
                    <i className={cn({
                      'far fa-eye': selectedId !== id,
                      'far fa-eye-slash': selectedId === id,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
