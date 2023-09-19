import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[],
  setSelectTodo: (todo: Todo) => void
  selectTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setSelectTodo,
  selectTodo,
}) => {
  const openModal = (todo: Todo) => {
    setSelectTodo(todo);
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
        {visibleTodos.map((todo) => {
          const isSelectedTodo = todo.id === selectTodo?.id;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelectedTodo,
              })}
              key={todo.id}
            >

              <td className="is-vcentered">
                {todo.id}
              </td>

              {todo.completed ? (
                <td className="is-vcentered">
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td
                  aria-label="icon is clicked"
                  className="is-vcentered"
                />
              )}

              <td className="is-vcentered is-expanded">
                <p
                  className={cn(
                    {
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
                    },
                  )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => openModal(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  aria-label="View Todo"
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': !isSelectedTodo,
                        'fa-eye-slash': isSelectedTodo,
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
