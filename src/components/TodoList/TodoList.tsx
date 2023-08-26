import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({
  items,
}) => {
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
        {items.map(({ id, title, completed }) => {
          return (
            <tr key={id} data-cy="todo" className="has-background-info-light">
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    <i className="fa" />
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
