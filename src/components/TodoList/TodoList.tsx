import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodoId: number | null; // Додано пропс для вибраного Todo
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodoId,
}) => {
  const handleClick = (todo: Todo) => {
    onSelect(todo); // Вибір Todo при натисканні
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo.completed ? 'has-background-info-light' : ''}
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
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => handleClick(todo)}
                className="button"
                type="button"
                data-cy="selectButton"
                aria-label={`Select task ${todo.title}`}
              >
                <span className="icon">
                <i
                  className={classNames({
                    'far fa-eye': selectedTodoId !== todo.id,
                    'far fa-eye-slash': selectedTodoId === todo.id
                  })}
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
