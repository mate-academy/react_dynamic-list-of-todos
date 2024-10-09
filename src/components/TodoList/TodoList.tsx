import cn from 'classnames';
import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setUpdatedTodos: (params: Todo[]) => void;
  updatedTodos: Todo[];
  todos: Todo[];
  filter: string;
};

export const TodoList: React.FC<Props> = ({
  setUpdatedTodos,
  updatedTodos,
  todos,
  filter,
}) => {
  useEffect(() => {
    switch (filter) {
      case 'all':
        setUpdatedTodos(todos);
        break;
      case 'active':
        setUpdatedTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setUpdatedTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setUpdatedTodos(todos);
    }
  }, [filter, todos, setUpdatedTodos]);

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
        {updatedTodos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon">
                  <i className="fas fa-check"></i>
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
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
