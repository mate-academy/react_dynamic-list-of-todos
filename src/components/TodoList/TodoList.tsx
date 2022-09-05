import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoId: number | null;
  onSelectedTodoId: (id: number) => void;
}

export const TodoList: React.FC<Props> = (
  { todos, selectedTodoId, onSelectedTodoId },
) => (
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
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames({
            'has-background-info-light': selectedTodoId === todo.id,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p
              className={todo.completed
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
              onClick={() => onSelectedTodoId(todo.id)}
            >
              <span className="icon">
                {selectedTodoId === todo.id
                  ? (<i className="far fa-eye-slash" />)
                  : (<i className="far fa-eye" />)}
              </span>
            </button>
          </td>
        </tr>
      ))}

    </tbody>
  </table>
);
