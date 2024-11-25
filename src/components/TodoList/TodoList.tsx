import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onSelect }) => {

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
      {todos.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed ? (
            <i className='fas fa-check-circle' data-cy="iconCompleted" />
          ) : (
          <i className="far fa-circle" />
          )}
        </td>
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">{todo.title}</p>
          <p>{todo.completed ? 'Completed' : 'Active'}</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => onSelect(todo)}
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
};
