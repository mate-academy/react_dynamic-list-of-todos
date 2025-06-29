import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  onShowTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onShowTodo }) => (
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
      {todos.map((todo, index) => (
        <tr
          key={todo.id}
          className={todo.completed ? 'has-background-info-light' : ''}
          data-cy="todo"
        >
          <td className="is-vcentered">{index + 1}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td
            className={`is-vcentered is-expanded ${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
          >
            <p>{todo.title}</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onShowTodo(todo)}
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
