import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

export const TodoList = React.memo(
  ({
    todo,
    carierTodo,
    setCarierTodo,
  }: {
    todo: Todo,
    carierTodo: Todo,
    setCarierTodo: React.Dispatch<React.SetStateAction<Todo>>
  }) => {
    const { id, title, completed } = todo;

    return (
      <tr data-cy="todo" className="">
        <td className="is-vcentered">{id}</td>
        {completed ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        ) : (
          <td className="is-vcentered" />
        )}
        <td className="is-vcentered is-expanded">
          <p
            className={classNames(
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
            onClick={() => {
              setCarierTodo(todo);
            }}
          >
            <span className="icon">
              <i className={
                classNames('far', {
                  'fa-eye': todo.id !== carierTodo.id,
                }, { 'fa-eye-slash': todo.id === carierTodo.id })
              }
              />
            </span>
          </button>
        </td>
      </tr>
    );
  },
);
