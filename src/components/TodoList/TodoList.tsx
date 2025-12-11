import React from 'react';
import type { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todosData: Todo[];
  onShowModal: (value: boolean) => void;
  onSelectTodoId: (value: number) => void;
  isModalOpen: boolean;
};

export const TodoList: React.FC<Props> = ({
  todosData,
  onShowModal,
  onSelectTodoId,
  isModalOpen,
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
      {todosData.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
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
              onClick={() => {
                onSelectTodoId(todo.id);
                onShowModal(true);
              }}
            >
              <span className="icon">
                <i
                  className={classNames('far', {
                    'fa-eye-slash': isModalOpen,
                    'fa-eye': !isModalOpen,
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
