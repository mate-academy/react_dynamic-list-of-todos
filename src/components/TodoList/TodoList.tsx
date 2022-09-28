import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId: Todo | null;
  setSelectedTodoId: (todo: Todo) => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
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
      {todos.map((todo) => {
        const { id, completed, title } = todo;

        return (
          (
            <tr
              data-cy="todo"
              className={(selectedTodoId === todo)
                ? 'has-background-info-light'
                : ''}
            >
              <td className="is-vcentered">{id}</td>
              {completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered" />
                )}
              <td className="is-vcentered is-expanded">
                <p className={
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
                  onClick={() => setSelectedTodoId(todo)}
                >
                  <span className="icon">
                    <i className={
                      selectedTodoId === todo
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
                    />
                  </span>
                </button>
              </td>
            </tr>
          )
        );
      })}

    </tbody>
  </table>
);
