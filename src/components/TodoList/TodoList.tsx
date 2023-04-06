import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  setSelectedTodoId: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = props => {
  const {
    todos,
    selectedTodoId,
    setSelectedTodoId,
  } = props;

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
      {todos.map(({ id, title, completed }) => (
        <tbody key={id}>
          <tr data-cy="todo" className="todo">
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                {
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                },
              )}
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
                  return selectedTodoId === id
                    ? setSelectedTodoId(0)
                    : setSelectedTodoId(id);
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    {
                      'fa-eye': selectedTodoId !== id,
                      'fa-eye-slash': selectedTodoId === id,
                    },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
