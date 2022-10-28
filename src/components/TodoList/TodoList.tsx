import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  setUserId: (id: number) => void;
  selectTodo: (todo: Todo) => void;
  selected: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setUserId,
  selectTodo,
  selected,
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
      {todos && todos.map((todo) => {
        const {
          id, title, userId, completed,
        } = todo;

        return (
          <tr
            data-cy="todo"
            className={cn({ 'has-background-info-light': selected?.id === id })}
            key={id}
          >
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
                  <i className={cn('far', {
                    'fa-eye': selected?.id !== id,
                    'fa-eye-slash': selected?.id === id,
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
