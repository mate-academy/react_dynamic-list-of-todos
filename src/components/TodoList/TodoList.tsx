import classNames from 'classnames';
import React, { memo } from 'react';
import { Todo } from '../../types/Todo';

export type Props = {
  todos: Todo[]
  selectedTodo(todoId: number): void
  selectedIdTodo: number | undefined
};

export const TodoList: React.FC<Props> = memo((
  { todos, selectedTodo, selectedIdTodo },
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
          data-cy="todo"
          className=""
          key={todo.id}
        >

          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed === true
              && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={classNames({
              'has-text-success': todo.completed === true,
              'has-text-danger': todo.completed === false,
            })}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {selectedIdTodo === todo.id
              ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectedTodo(0)}
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              )
              : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectedTodo(todo.id)}
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
));
