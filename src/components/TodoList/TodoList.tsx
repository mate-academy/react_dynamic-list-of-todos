import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  activeId: number;
  onSelectTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  activeId,
  onSelectTodo,
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
        {todos.map((todo: Todo) => {
          const {
            completed, title, id,
          } = todo;
          const isIdActive = id === activeId;

          return (
            <tr
              data-cy="todo"
              key={id}
              className={classNames({
                'has-background-info-light': isIdActive,
              })}
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
                  className={classNames('has-text-success', {
                    'has-text-danger': !completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectTodo(id)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye-slash': isIdActive },
                      { 'fa-eye': !isIdActive },
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
