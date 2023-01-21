import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectTodoId: (todoId: number) => void,
  selectedTodoId: number
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    selectTodoId,
    selectedTodoId,
  },
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
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed
              ? (
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              )
              : (undefined)}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={cn('',
                { 'has-text-success': todo.completed },
                { 'has-text-danger': !todo.completed })}
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
                selectTodoId(todo.id);
              }}
            >
              <span className="icon">
                <i className={`far fa-eye${selectedTodoId === todo.id ? '-slash' : ''}`} />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
