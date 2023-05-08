import React from 'react';
import classNames from 'classnames';
import { Todo, TodoWithUser } from '../../types/Todo';
import { getUser } from '../../api';

interface Props {
  todos: Todo[];
  setTodo: (todo: TodoWithUser | null) => void;
  isTodoModal: boolean;
  setIsTodoModal: (isTodoModal: boolean) => void;
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setTodo,
  isTodoModal,
  setIsTodoModal,
}) => {
  const handleDetailsOpen = (todo: Todo) => {
    setIsTodoModal(true);
    getUser(todo.userId).then(user => setTodo({
      ...todo,
      user,
    }));
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
        {todos.map((todo) => {
          const {
            id,
            title,
            completed,
          } = todo;

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
                  className={classNames({
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
                  onClick={() => handleDetailsOpen(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': !isTodoModal,
                        'fa-eye-slash': isTodoModal,
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
});
