import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  list: Todo[];
  activeTodo?: Todo | null;
  setActiveTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  list,
  activeTodo,
  setActiveTodo,
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
        {list.map(item => {
          return (
            <tr key={item.id} data-cy="todo" className="">
              <td className="is-vcentered">{item.id}</td>
              {item.completed ? (
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
                  className={`has-text-${item.completed ? 'success' : 'danger'}`}
                >
                  {item.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    setActiveTodo(item);
                  }}
                >
                  <span className="icon">
                    {item.id === activeTodo?.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
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
