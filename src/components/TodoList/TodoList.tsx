/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodosProps {
  todos: Todo[] | undefined
  onTodoSelected: (item: Todo) => void
  todoId?: number | undefined
}

export const TodoList: React.FC<TodosProps> = ({
  todos,
  onTodoSelected,
  todoId,
}) => {
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
        {todos?.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': todo.id === todoId },
            )}
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
              <p className={classNames(
                {
                  'has-text-danger': todo.completed === false,
                  'has-text-success': todo.completed === true,
                },
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
                onClick={() => onTodoSelected(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye-slash': todo.id === todoId,
                    'fa-eye': todo.id !== todoId,
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
