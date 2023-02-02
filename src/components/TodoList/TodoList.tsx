import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';

type Props = {
  todos: Todo[],
  selected: Todo | null,
  onClick: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selected,
  onClick,
}) => (
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
        const { id, completed, title } = todo;
        const isSelectedTodo = todo === selected;

        return (
          <tr
            key={id}
            data-cy="todo"
            className=""
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
                className={classNames({
                  'has-text-success': completed,
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
                onClick={() => onClick(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': !isSelectedTodo,
                      'fa-eye-slash': isSelectedTodo,
                    })}
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
