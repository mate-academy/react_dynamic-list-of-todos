import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedId: number | null;
  onShow: (todo: Todo) => void;
  onHide: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedId,
  onShow,
  onHide,
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
          <th></th>
        </tr>
      </thead>

      <tbody>
        {todos.map((t) => {
          const isSelected = selectedId === t.id;

          return (
            <tr data-cy="todo" key={t.id}>
              <td className="is-vcentered">{t.id}</td>
              <td className="is-vcentered">
                {t.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-danger': !t.completed,
                    'has-text-success': t.completed,
                  })}
                >
                  {t.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {isSelected ? (
                  <button
                    data-cy="unselectButton"
                    className="button"
                    type="button"
                    onClick={onHide}
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onShow(t)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
