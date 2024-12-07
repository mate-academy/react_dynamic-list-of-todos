import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  targetTodo: Todo | null;
  setTargetTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  targetTodo,
  setTargetTodo,
}) => {
  const check = (
    <td className="is-vcentered">
      <span className="icon" data-cy="iconCompleted">
        <i className="fas fa-check" />
      </span>
    </td>
  );
  const isntCheck = <td className="is-vcentered" />;

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
          const isButtonFocused = targetTodo?.id === id;

          return (
            <tr
              data-cy="todo"
              key={`todo-${id}`}
              className={isButtonFocused ? 'has-background-info-light' : ''}
              id={`${id}`}
            >
              <td className="is-vcentered">{id}</td>
              {completed ? check : isntCheck}
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
                  aria-label="select todo"
                  onClick={() => {
                    setTargetTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i
                      className={`far ${isButtonFocused ? 'fa-eye-slash' : 'fa-eye'}`}
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
