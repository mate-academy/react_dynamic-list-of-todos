import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  onFilterTodos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo | null) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  onFilterTodos,
  selectedTodo,
  setSelectedTodo,
}) => {
  const todoElements = onFilterTodos.map(todo => {
    const { id, title, completed } = todo;

    return (
      <tr
        key={id}
        data-cy="todo"
        className={classNames({
          'has-background-info-light': selectedTodo?.id === id,
        })}
      >
        <td className="is-vcentered">{id}</td>
        <td className="is-vcentered">
          {completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
        </td>
        <td className="is-vcentered is-expanded">
          <p
            className={classNames({
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
            onClick={() => setSelectedTodo(todo)}
          >
            <span className="icon">
              <i className={classNames('far', {
                'fa-eye': selectedTodo?.id !== id,
                'fa-eye-slash': selectedTodo?.id === id,
              })}
              />
            </span>
          </button>
        </td>
      </tr>
    );
  });

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
        {todoElements}
      </tbody>
    </table>
  );
};
