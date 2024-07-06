import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onTodoClick: (todo: Todo) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoClick,
  selectedTodoId,
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
      {todos.map(todo => {
        const { id, title, completed } = todo;

        return (
          <tr data-cy="todo" className="" key={id}>
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onTodoClick(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodoId !== id ? 'far fa-eye' : 'far fa-eye-slash'
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
