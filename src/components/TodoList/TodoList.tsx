import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[] | string;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onSelectTodo }) => {
  if (typeof todos === 'string') {
    return <p>{todos}</p>;
  }

  return (
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
            onClick={() => onSelectTodo(todo)}
            data-cy="todo"
            className={index % 2 === 0 ? '' : 'has-background-info-light'}
          >
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              ) : null}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i
                    className={
                      todo.completed ? 'far fa-eye-slash' : 'far fa-eye'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
