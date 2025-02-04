import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todo: Todo | null;
  handleSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, todo, handleSelect }) => {
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
        {todos.map(el => {
          return (
            <tr
              key={el.id}
              data-cy="todo"
              className={el.id === todo?.id ? 'has-background-info-light' : ''}
            >
              <td className="is-vcentered">{el.id}</td>
              {el.completed ? (
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
                    el.completed ? ' has-text-success' : 'has-text-danger'
                  }
                >
                  {el.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelect(el)}
                >
                  <span className="icon">
                    {el.id === todo?.id ? (
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
