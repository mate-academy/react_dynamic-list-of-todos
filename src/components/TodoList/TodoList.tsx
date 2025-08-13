import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onTodoSelect: (todoId: number) => void; // Changed to todoId instead of userId
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onTodoSelect }) => (
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
          key={todo.id}
          className={
            todo.completed
              ? 'has-background-success-light'
              : 'has-background-info-light'
          }
          data-cy="todo"
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
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
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
              onClick={() => onTodoSelect(todo.id)} // Changed to todo.id
            >
              <span className="icon">
                <i
                  className={todo.completed ? 'far fa-eye' : 'far fa-eye-slash'}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
