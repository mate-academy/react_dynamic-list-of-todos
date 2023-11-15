import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selctedTodo: Todo | undefined;
  setSelctedTodo: (arg0: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selctedTodo,
  setSelctedTodo,
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
        {todos.map(todo => (
          <>
            <tr
              data-cy="todo"
              className={todo === selctedTodo
                ? 'has-background-info-light'
                : ''}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelctedTodo(todo)}
                >
                  <span className="icon">
                    <i className={`far ${todo === selctedTodo
                      ? 'fa-eye-slash'
                      : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
