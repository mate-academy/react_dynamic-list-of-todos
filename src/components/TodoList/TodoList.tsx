import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  callback: Dispatch<SetStateAction<Todo | null>>,
  selectedTodo: Todo | null,
};
export const TodoList: React.FC<Props> = ({
  todos,
  callback,
  selectedTodo,

}) => {
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

      <tbody>
        { todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              key={id}
              className={classNames(
                { 'has-background-info-light': selectedTodo === todo },
              )}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed
            && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames('has-text-success',
                    { 'has-text-danger': completed === false })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => callback(todo)}
                >
                  <span className="icon">
                    <i className={classNames('far',
                      { 'fa-eye': selectedTodo !== todo },
                      { 'fa-eye-slash': selectedTodo === todo })}
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
};
