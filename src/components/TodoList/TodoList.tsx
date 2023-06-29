import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  isTodoInfoRequested: boolean,
  setIsTodoInfoRequested: (arg: boolean) => void,
  setUserId: (arg: number) => void,
  setSelectedTodo: (arg: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  isTodoInfoRequested,
  setIsTodoInfoRequested,
  setUserId,
  setSelectedTodo,
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
        {todos.map(todo => (
          <tr data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
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
                  setIsTodoInfoRequested(true);
                  setUserId(todo.userId);
                  setSelectedTodo(todo);
                }}
              >
                <span className="icon">
                  {isTodoInfoRequested
                    ? <i className="far fa-eye-slash" />
                    : <i className="far fa-eye" />}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
