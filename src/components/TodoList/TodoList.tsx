import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type TodoListProps = {
  todos: Todo[];
  selectedTodoId?: number | null;
  onShowModal: (todoId: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodoId,
  onShowModal,
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
          const { id, completed, title } = todo;
          return (
            <tr data-cy="todo" key={id}>
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
                  className={cn({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
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
                  onClick={() => onShowModal(id)}
                >
                  <i
                    className={cn('far', {
                      'fa-eye-slash': id === selectedTodoId,
                      'far fa-eye': id !== selectedTodoId,
                    })}
                  />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
