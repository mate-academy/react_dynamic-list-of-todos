import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface IProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedUser: (todo: Todo) => void;
}

export const TodoList: React.FC<IProps> = ({
  todos,
  selectedTodo,
  setSelectedUser,
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
        const { id, completed, title } = todo;

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
              <p
                className={cn({
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
                onClick={() => setSelectedUser(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye':
                        !selectedTodo ||
                        (selectedTodo && selectedTodo.id !== id),
                      'fa-eye-slash': selectedTodo && selectedTodo.id === id,
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
