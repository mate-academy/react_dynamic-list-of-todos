import classNames from 'classnames';
import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  chooseTodo: (todo: Todo) => void;
  choosedTodoId: number | undefined;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  chooseTodo,
  choosedTodoId,
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
        {visibleTodos.map((todo) => {
          const {
            id,
            title,
            completed,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames(choosedTodoId === id
                && 'has-background-info-light')}
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
                  className={classNames(`has-text-${completed ? 'success' : 'danger'}`)}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    chooseTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i className={classNames('far fa-eye',
                      { 'fa-eye-slash': choosedTodoId === id })}
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
