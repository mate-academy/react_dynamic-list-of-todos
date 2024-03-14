import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShowModal: (todo: Todo) => void;
  selectedTodoId: number | null;
  setSelectedTodoId: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShowModal,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const handleToggleSelected = (id: number, todo: Todo) => {
    setSelectedTodoId(id);
    onShowModal(todo);
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
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': id === selectedTodoId,
              })}
              key={id}
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
                  className={classNames({
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
                  onClick={() => handleToggleSelected(id, todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames({
                        'far fa-eye-slash': id === selectedTodoId,
                        'far fa-eye': id !== selectedTodoId,
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
