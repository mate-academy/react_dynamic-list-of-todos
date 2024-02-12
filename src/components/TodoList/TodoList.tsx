import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId?: number | null;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelect = () => { },
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
      {todos.map(({
        id,
        completed,
        title,
        userId,
      }) => (
        <tr key={id} data-cy="todo" className="">
          <td className="is-vcentered">{id}</td>
          {completed ? (
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
              className={
                completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {id === selectedTodoId ? (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelect(null)}
              >
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelect({
                  id,
                  completed,
                  title,
                  userId,
                })}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
