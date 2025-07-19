import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onClick?: (id: number) => void;
  todoSet?: Todo;
};

export const TodoList: React.FC<Props> = ({ todos, onClick, todoSet }) => (
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
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={
                !todo.completed ? 'has-text-danger' : 'has-text-success'
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
              onClick={() => onClick && onClick(todo.id)}
            >
              <span className="icon">
                <i
                  className={
                    todoSet?.id !== todo.id ? 'far fa-eye' : 'far fa-eye-slash'
                  }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
      {todos.length === 0 && (
        <tr>
          <td colSpan={4} className="has-text-centered">
            No todos found
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
