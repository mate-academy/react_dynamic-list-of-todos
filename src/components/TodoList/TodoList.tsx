import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo[];
  selectedTodoId: number | null;
  onShow: (
    userNumber: number,
    comment: string,
    completedTrue: boolean,
    todo: Todo | null,
  ) => void;
}

export const TodoList: React.FC<Props> = ({ todo, onShow, selectedTodoId }) => (
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
      {todo.map(item => {
        const isSelected = selectedTodoId === item.id;

        return (
          <tr data-cy="todo" key={item.id}>
            <td className="is-vcentered">{item.id}</td>

            <td className="is-vcentered">
              {item.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !item.completed,
                  'has-text-success': item.completed,
                })}
              >
                {item.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onShow(item.userId, item.title, item.completed, item);
                }}
              >
                <span className="icon">
                  <i
                    className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'}
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
