import React from 'react';
import className from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[]
  setSelectedTodo: (x: Todo) => void
  selectedTodo: Todo
};

export const TodoList: React.FC<Props> = ({
  todoList,
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
      {
        todoList.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={
                className(
                  { 'has-text-success': todo.completed },
                  { 'has-text-danger': !todo.completed },
                )
              }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setSelectedTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={className(
                    'far',
                    selectedTodo.id !== todo.id ? 'fa-eye' : 'fa-eye-slash',
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);
