import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[],
  activeTodo: Todo | undefined,
  handleTodoClick: (id: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  activeTodo,
  handleTodoClick,
}) => {
  const activeID = activeTodo ? activeTodo.id : 0;

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
        {todos.map(({ id, completed, title }) => {
          const isSelected = activeID === id;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={isSelected
                ? 'has-background-info-light'
                : ''}
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
                  className={completed
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
                  onClick={() => handleTodoClick(id)}
                >
                  <span className="icon">
                    <i
                      className={`far
                        ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
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
};
