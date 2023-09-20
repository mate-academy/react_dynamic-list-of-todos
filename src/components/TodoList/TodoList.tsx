import cn from 'classnames';

import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  setSelectedTodo: (todo: Todo) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
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
        {todos.map(todo => {
          const { id, title, completed } = todo;
          const isTodoSelected = selectedTodo
            ? selectedTodo.id === id
            : false;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isTodoSelected,
              })}
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
                <p className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i className={cn({
                      'far fa-eye': !isTodoSelected,
                      'far fa-eye-slash': isTodoSelected,
                    })}
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
