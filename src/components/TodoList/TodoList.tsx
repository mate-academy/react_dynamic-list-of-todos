import React from 'react';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodo: Todo | null,
  selectTodo: (todo: Todo) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectTodo,
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
          <tr
            data-cy="todo"
            className={(selectedTodo && id === selectedTodo.id)
              ? 'has-background-info-light'
              : ''}
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
              <p className={completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(todo)}
              >
                <span className="icon">
                  <i className={
                    (selectedTodo && id !== selectedTodo.id) || !selectedTodo
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'
                  }
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
