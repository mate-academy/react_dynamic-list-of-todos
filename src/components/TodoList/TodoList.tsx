import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<TodoListProps> = (
  { todos, onTodoSelect },
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
      {todos.map((todo) => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className={cn({ 'has-text-danger': !todo.completed })}>
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="selectButton"
              className="button"
              onClick={() => onTodoSelect(todo)}
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
