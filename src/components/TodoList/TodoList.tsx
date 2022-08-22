import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShowClick: (id: number) => void;
  activeId: number;
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos, onShowClick, activeId } = props;

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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">
              {todo.id}
            </td>
            {todo.completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )
              : (
                <td className="is-vcentered" />
              )}
            <td className="is-vcentered is-expanded">
              <p className={classNames(todo.completed
                ? 'has-text-success'
                : 'has-text-danger')}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onShowClick(todo.id);
                }}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye-slash': activeId === todo.id,
                    'fa-eye': activeId !== todo.id,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
