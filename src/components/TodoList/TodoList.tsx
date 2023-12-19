import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onSelectTodo: (v: Todo) => void,
  selectedTodoId: number | undefined,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  selectedTodoId,
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
          const { id, completed, title } = todo;
          const selected = selectedTodoId === todo.id;

          return (
            <tr
              data-cy="todo"
              key={id}
              className={
                selected
                  ? 'has-background-info-light'
                  : ''
              }
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
                <p
                  className={
                    completed ? 'has-text-success' : 'has-text-danger'
                  }
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
                    onSelectTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i
                      className={
                        selected
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
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
};
