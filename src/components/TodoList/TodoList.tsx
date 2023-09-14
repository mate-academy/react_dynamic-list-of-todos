/* eslint-disable max-len */
import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  changeTodo: Dispatch<SetStateAction<Todo | null>>,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  changeTodo,
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
        {todos.map((todo: Todo) => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
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
              <p
                className={cn(
                  {
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  },
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => changeTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far fa-eye',
                      {
                        'fa-eye-slash': selectedTodo?.id === todo.id,
                      },
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
