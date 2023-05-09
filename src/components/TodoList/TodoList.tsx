import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleSetModalTodo: (todo:Todo) => void;
  modalActiveTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleSetModalTodo,
  modalActiveTodo,
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
        const {
          id,
          title,
          completed,
        } = todo;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': modalActiveTodo,
            })}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered" />
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
                onClick={() => handleSetModalTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': modalActiveTodo?.id !== id,
                    'fa-eye-slash': modalActiveTodo?.id === id,
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
