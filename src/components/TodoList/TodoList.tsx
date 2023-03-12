import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  activeId: number;
  setActiveId: (id: number) => void;
};

export const TodoList: FC<Props> = ({
  todos,
  activeId,
  setActiveId,
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
        {todos.map(todo => {
          const {
            completed,
            id,
            title,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className={id === activeId
                ? 'has-background-info-light'
                : ''}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setActiveId(id)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye-slash': id === activeId },
                      { 'fa-eye': id !== activeId },
                    )}
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
