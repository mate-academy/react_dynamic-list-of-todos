import React from 'react';
import { Todo } from '../../types/Todo';
interface Props {
  todo: Todo[];
  onShow: (
    userNumber: number,
    comment: string,
    completedTrue: boolean,
    todo: Todo | null,
  ) => void;
}
export const TodoList: React.FC<Props> = ({ todo, onShow }) => (
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
      {todo.map((item, index) => (
        <tr data-cy="todo" className="" key={index}>
          <td className="is-vcentered">{item.userId}</td>
          <td className="is-vcentered" />
          <td className="is-vcentered  is-expanded">
            <p className={`has-text-${!item.completed ? 'danger' : 'success'}`}>
              {item.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => {
                onShow(item.userId, item.title, item.completed, item);
              }}
            >
              <span className="icon">
                <i
                  className={item.completed ? 'far fa-eye' : 'far fa-eye-slash'}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
