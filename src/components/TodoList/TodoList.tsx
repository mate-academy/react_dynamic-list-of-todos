import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filteredItems: Todo[];
};
export const TodoList: React.FC<Props> = ({ filteredItems }) => (
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
      {filteredItems.map((item) => (
        <tr data-cy="todo" key={item.id} className="">
          <td className="is-vcentered">{item.id}</td>
          <td className="is-vcentered">
            {item.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={cn('has-text-danger', {
                'has-text-success': item.completed === true,
              })}
            >
              {item.title}
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
