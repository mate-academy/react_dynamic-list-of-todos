import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  isOpen: boolean;
  changeOpen: (value: boolean) => void;
  changeCurrentTodo: (value: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  isOpen,
  changeOpen,
  changeCurrentTodo,
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
        const { id, title, completed } = todo;

        return (
          <tr data-cy="todo" className="" key={id}>
            <td className="is-vcentered">{id}</td>

            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={cn({
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
                onClick={() => {
                  changeOpen(true);
                  changeCurrentTodo(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': !isOpen,
                      'fa-eye-slash': isOpen,
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
