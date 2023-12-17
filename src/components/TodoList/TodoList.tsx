import React from 'react';
import { User } from '../../types/User';

interface TodoListProps {
  todos: Todo[] | undefined;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
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
      {todos?.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
                {/* <i className="far fa-eye" /> */}
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                { /* logic here  */ }
                <i className="far fa-eye fa-eye-slash" />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
