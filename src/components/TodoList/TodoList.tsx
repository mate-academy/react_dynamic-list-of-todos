import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  onSelectedTodo:(todo: Todo) => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectedTodo,
}) => (
  <table className="table is-narrow is-fullwidth">
    <tbody>
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className=""
        >
          <td className="is-vcentered">{todo.id}</td>
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
              onClick={() => onSelectedTodo(todo)}
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
