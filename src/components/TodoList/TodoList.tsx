import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedId?: number;
  onShow: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectedId, onShow }) => {
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
          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map(t => {
          const isSelected = selectedId === t.id;

          return (
            <tr
              key={t.id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isSelected,
              })}
            >
              <td className="is-vcentered">{t.id}</td>
              <td className="is-vcentered">
                {t.completed && (
                  <span
                    className="icon has-text-success"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" data-cy="iconCompleted" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({ 'has-text-danger': !t.completed })}>
                  {t.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onShow(t)}
                >
                  <span className="icon">
                    <i
                      className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
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
