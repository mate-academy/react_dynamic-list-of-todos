import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: number,
  selectTodo: (todo: Todo) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodo,
}) => {
  const handleSelect = (todo: Todo) => {
    selectTodo(todo);
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
            completed,
            id,
            title,
          } = todo;

          const isSelected = id === selectedTodo;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelected,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelect(todo)}
                >
                  <span className="icon">
                    <i
                      className={
                        isSelected
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
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
