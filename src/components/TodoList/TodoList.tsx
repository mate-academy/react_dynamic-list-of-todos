import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  select: number;
  setSelect: (select: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, select, setSelect }) => {
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
        <tr
          data-cy="todo"
          className={cn(select === todo.id && 'has-background-info-light')}
          key={todo.id}
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
              className={cn(
                todo.completed ? 'has-text-success' : 'has-text-danger',
              )}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelect(todo.id)}
            >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      select === todo.id ? 'fa-eye-slash' : 'fa-eye',
                    )}
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
