import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  searchFilter: string;
  modalId: number | undefined;
  setModalId: (a: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  searchFilter,
  modalId,
  setModalId,
}) => {
  const noSearchMatch = searchFilter.length > 0 && todos.length === 0;

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

      {todos.map(todo => (
        <tbody key={todo.id}>
          <tr
            data-cy="todo"
            className={cn({ 'has-background-info-light': todo.id === modalId })}
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
                className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
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
                onClick={() => setModalId(todo.id)}
              >
                <span className="icon">
                  {todo.id !== modalId ? (
                    <i className="far fa-eye" />
                  ) : (
                    <i className="far fa-eye-slash" />
                  )}
                </span>
              </button>
            </td>
          </tr>
          {noSearchMatch && (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )}
        </tbody>
      ))}
    </table>
  );
};
