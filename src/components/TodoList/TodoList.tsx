import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

export interface Props {
  todos: Todo[],
  selectedTodoId: number,
  selectTodo: (id: number) => void,
}

export const TodoList: React.FC<Props> = (
  { todos, selectedTodoId, selectTodo },
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
          // className="has-background-info-light"
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          <td className="is-vcentered is-expanded">
            <p
              className={cn({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {selectedTodoId === todo.id
              ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectTodo(0)}
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
                  onClick={() => selectTodo(todo.id)}
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
