import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  isSelected: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, onShow, isSelected }) => (
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
      {todos.map((todo) => (
        <tr data-cy="todo" className="">
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expanded">
            <p
              className={cn({
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
              type="button"
              onClick={() => {
                onShow(todo);
              }}
            >
              <span className="icon">
                <i
                  className={cn('far', {
                    'fa-eye': isSelected === null,
                    'fa-eye-slash': isSelected !== null,
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
