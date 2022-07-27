import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filterTodos: Todo[],
  setSelectedTodo: (todo: Todo) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  filterTodos,
  setSelectedTodo,
  selectedTodo,
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
      {filterTodos.map(todo => (
        <tr
          data-cy="todo"
          className={
            selectedTodo?.id !== todo.id ? '' : 'has-background-info-light'
          }
          key={todo.id}
        >
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

          {todo.completed ? (
            <td className="is-vcentered is-expanded">
              <p className="has-text-success">{todo.title}</p>
            </td>
          ) : (
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{todo.title}</p>
            </td>
          )}

          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelectedTodo(todo)}
            >
              <span className="icon">
                <i className={
                  selectedTodo?.id !== todo.id
                    ? 'far fa-eye'
                    : 'far fa-eye-slash'
                }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
