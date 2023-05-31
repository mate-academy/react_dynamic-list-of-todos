import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  selectedTodo: number;
  onSelect: (todoId: number) => void;
}
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onSelect,
}) => (
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
        const {
          id,
          completed,
          title,
        } = todo;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': selectedTodo === id },
            )}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                { 'has-text-success': completed },
                { 'has-text-danger': !completed },
              )}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelect(id)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye': selectedTodo !== id },
                    { 'fa-eye-slash': selectedTodo === id },
                  )}
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
