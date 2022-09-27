import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  handleOnSelectedTodo: (todo: Todo) => void,
  currentTodo: Todo | null
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleOnSelectedTodo,
  currentTodo,
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
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo">
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expanded">
            <p className={todo.completed ? (
              'has-text-success'
            ) : (
              'has-text-danger'
            )}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {currentTodo?.id === todo.id ? (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
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
                onClick={() => handleOnSelectedTodo(todo)}
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
