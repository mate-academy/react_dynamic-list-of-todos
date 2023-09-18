import React from 'react';
// import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onSelect: (todoId: number | null) => void,
  selectedTodo: number | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodo,
}) => {
  const handleShowButton = (todo: Todo) => {
    onSelect(todo.id);
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
            completed,
            title,
          } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className=""
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
                <p
                  className={completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleShowButton(todo)}
                >
                  <span className="icon">
                    <i
                      className={id !== selectedTodo
                        ? (
                          'far fa-eye'
                        )
                        : (
                          'far fa-eye-slash'
                        )}
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
