import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[],
  currentTodo: Todo | undefined,
  setCurrentTodo: (todo: Todo) => void,
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  currentTodo,
  setCurrentTodo,
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
      {todos.map((todo) => {
        const { id, title, completed } = todo;

        return (
          <tr key={id} data-cy="todo" className="">
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`has-text-${completed ? 'success' : 'danger'}`}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setCurrentTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${currentTodo?.id === id ? '-slash' : ''}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
