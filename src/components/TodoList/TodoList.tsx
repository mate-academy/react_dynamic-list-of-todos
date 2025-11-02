import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  selectedId: number | null;
};

export const TodoList: React.FC<Props> = ({ todos, onShow, selectedId }) => (
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
      {todos.map((todo, index) => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames('todo', {
            'has-background-info-light': todo.completed,
          })}
        >
          <td className="is-vcentered">{index + 1}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames({
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
              onClick={() => onShow(todo)}
            >
              <span className="icon">
                <i
                  className={classNames('far', {
                    'fa-eye-slash': todo.id === selectedId,
                    'fa-eye': todo.id !== selectedId,
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
