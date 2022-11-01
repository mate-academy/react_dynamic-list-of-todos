import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  isSelectedTodoId: number,
  setIsSelectedTodoId: (todoId: number) => void;
  setIsLoadedUser: (status: boolean) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  isSelectedTodoId,
  setIsSelectedTodoId,
  setIsLoadedUser,
}) => {
  const onSelectTodo = (todoId: number) => {
    setIsSelectedTodoId(todoId);
    setIsLoadedUser(false);
  };

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
        {todos.map(todo => {
          const {
            id,
            title,
            completed,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className=""
              key={id}
            >
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
                  { 'has-text-danger': !completed },
                  { 'has-text-success': completed },
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
                  onClick={() => onSelectTodo(id)}
                >
                  <span className="icon">
                    <i className={classNames('far',
                      { 'fa-eye-slash': isSelectedTodoId === id },
                      { 'fa-eye': isSelectedTodoId !== id })}
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
