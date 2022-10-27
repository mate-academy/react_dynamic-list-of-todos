import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setUserId: (id: number) => void;
  selectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setUserId,
  selectTodo,
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

    {todos.map((todo) => {
      const {
        id, title, userId, completed,
      } = todo;

      return (
        <tbody key={id}>
          <tr data-cy="todo" className="">
            <td className="is-vcentered">{id}</td>
            {completed
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
              <p className={cn({
                'has-text-danger': !completed,
                'has-text-success': completed,
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
                onClick={() => {
                  setUserId(userId);
                  selectTodo(todo);
                }}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      );
    })}
  </table>
);
