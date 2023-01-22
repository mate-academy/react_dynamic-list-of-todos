import React, { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectTodo: (todoId: number) => void,
  selectedTodo: number,
};

export const TodoList: React.FC<Props> = memo((
  {
    todos,
    selectTodo,
    selectedTodo,
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
        <tr
          data-cy="todo"
          className=""
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed
              ? (
                <span className="icon" data-cy="iconCompleted">
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
                selectTodo(todo.id);
              }}
            >
              <span className="icon">
                <i
                  className={cn('far',
                    { 'fa-eye': selectedTodo === 0 },
                    { 'fa-eye-slash': selectedTodo === todo.id })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
));
