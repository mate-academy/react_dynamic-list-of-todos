import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
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
        {todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr key={id} data-cy="todo" className="">
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p className={cn({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
                >
                  {title}
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
          );
        })}

        <tr data-cy="todo" className="has-background-info-light">
          <td className="is-vcentered">2</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">
              quis ut nam facilis et officia qui
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye-slash" />
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
