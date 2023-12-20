import React from 'react';
import { TodoListProps } from '../../types/TodoListProps';

export const TodoList:
React.FC<TodoListProps> = ({ todos, onSelectTodo, selectedTodoId }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <tbody>
        {todos.map((todo) => {
          const { id, completed, title } = todo;

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
                <p className={completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    {id === selectedTodoId ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
