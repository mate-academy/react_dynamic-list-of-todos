import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setIsClicked: (id: number) => void
  selectedTodo: null | Todo,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIsClicked,
  selectedTodo,
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
      {todos.map((todo) => (
        <tr data-cy="todo" className="">
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
              onClick={() => setIsClicked(todo.id)}
            >
              {selectedTodo
                ? (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                )
                : (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                )}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
