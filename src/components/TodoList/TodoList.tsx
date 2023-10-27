import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  isSelected: Todo | null;
  setIsSelected: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  isSelected,
  setIsSelected,
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
      {todos.map(el => (
        <tr data-cy="todo" className="" key={el.id}>
          <td className="is-vcentered">{el.id}</td>
          <td className="is-vcentered">
            {el.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={classNames({
              'has-text-success': el.completed,
              'has-text-danger': !el.completed,
            })}
            >
              {el.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setIsSelected(el)}
            >
              <span className="icon">
                <i className={classNames({
                  'far fa-eye': !isSelected,
                  'far fa-eye-slash': isSelected,
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
