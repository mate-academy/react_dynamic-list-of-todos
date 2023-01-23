import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: FC<Props> = ({ todos }) => (
  <table className="table is-narrow is-fullwidth">
    {todos.length !== 0 && (
      <>
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
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <i className="fas fa-check" />
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn(
                    {
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    },
                  )}
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
      </>
    )}
  </table>
);
