import React from 'react';
import classNames from 'classnames/bind';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  handleModal: (todo: Todo) => () => void,
  selectedUserId: number
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    handleModal,
    selectedUserId,
  },
) => (
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
        // <tr key={todo.id} data-cy="todo" className="has-background-info-light">
        <tr key={todo.id} data-cy="todo" className="">
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          {/* <td className="is-vcentered" /> */}
          <td className="is-vcentered is-expanded">
            <p className={classNames({
              'has-text-success': todo.completed,
              'has-text-danger': !todo.completed,
            })}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              name="selectButton"
              onClick={handleModal(todo)}
              type="button"
            >
              <span className="icon">
                <i className={classNames('far', {
                  'fa-eye-slash': selectedUserId === todo.userId,
                  'fa-eye': selectedUserId !== todo.userId,
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
