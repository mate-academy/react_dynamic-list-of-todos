import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todosArray: Todo[];
  selectById: (param: number) => void;
};

export const TodoList: React.FC<Props> = ({ todosArray, selectById }) => (
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
      {todosArray.map(objc => {
        return (
          <tr data-cy="todo" className="" key={objc.id}>
            <td className="is-vcentered">{objc.id}</td>
            {objc.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}

            <td className="is-vcentered is-expanded">
              <p
                className={
                  objc.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {objc.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectById(objc.id)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
