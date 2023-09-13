import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todo, selectedTodo, setSelectedTodo,
}) => {
  const handleClick = (currentTodo: Todo) => {
    if (setSelectedTodo) {
      setSelectedTodo(currentTodo);
    }
  };

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
        {todo.map(currentTodo => (
          <tr
            data-cy="todo"
            key={currentTodo.id}
            className={classNames({
              'has-background-info-light': selectedTodo !== null
              && selectedTodo.id === currentTodo.id,
            })}
          >
            <td className="is-vcentered">{currentTodo.id}</td>
            {currentTodo.completed ? (
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
                className={currentTodo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {currentTodo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClick(currentTodo)}
              >
                <span className="icon">
                  <i className={
                    selectedTodo !== null && selectedTodo.id === currentTodo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'
                  }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
