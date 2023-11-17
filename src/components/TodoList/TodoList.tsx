import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: number | undefined;
  setSelectedTodo: (value: Todo) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
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

        {todos.map(todo => {
          const { id, title, completed } = todo;
          const selected = selectedTodo === id;

          return (
            <tr
              data-cy="todo"
              className={classNames(
                { 'has-background-info-light': selected },
              )}
              key={id}
            >
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
                  className={completed ? 'has-text-success' : 'has-text-danger'}
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
                    <i className={`far ${selected ? 'fa-eye-slash' : 'fa-eye'}`} />
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
