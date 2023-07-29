import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  todoUser: Todo | null;
  search:(userId: number, id: number) => void
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    todoUser,
    search,
  },
) => (
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
        <tr
          data-cy="todo"
          className={todoUser !== null
            ? cn({
              'has-background-info-light':
               todoUser.id === todo.id,
            }) : ''}
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={
              !todo.completed ? 'has-text-danger' : 'has-text-success'
            }
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
                search(todo.userId, todo.id);
              }}
            >
              <span className="icon">
                <i className={
                  todoUser !== null
                    ? cn({
                      'far fa-eye-slash':
                       todoUser.id === todo.id,
                      'far fa-eye':
                       todoUser.id !== todo.id,

                    })
                    : 'far fa-eye'
                }
                />

              </span>
            </button>
          </td>
        </tr>

      ))}

    </tbody>
  </table>
);
