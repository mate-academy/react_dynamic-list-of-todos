import React from 'react';
import className from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = (
  { todos, selectedTodo, setSelectedTodo },
) => (
  <table
    className="
      table
      is-narrow
      is-fullwidth"
  >
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
        <tr
          className={className(
            selectedTodo?.id === todo.id
              ? 'has-background-info-light'
              : '',
          )}
          data-cy="todo"
          key={todo.id}
        >
          <td className="is-vcentered">
            {todo.id}
          </td>

          <td
            className="is-vcentered"
          >
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          <td className="is-vcentered is-expanded">
            <p
              className={className(
                !todo.completed
                  ? 'has-text-danger'
                  : 'has-text-success',
              )}
            >
              {todo.title}
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
                {selectedTodo?.id === todo.id
                  ? <i className="far fa-eye-slash" />
                  : <i className="far fa-eye" />}
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
