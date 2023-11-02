import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  modalTodo: Todo | null;
  setIsModalVisible: (value: boolean) => void;
  setModalTodo: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    modalTodo,
    setModalTodo,
    setIsModalVisible,
  },
) => {
  const handleClick = (todo: Todo) => {
    setModalTodo(todo);
    setIsModalVisible(true);
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
          <th aria-label="th" />
        </tr>
      </thead>

      <tbody>
        {todos.map((todo) => {
          const isSeletedTodo = modalTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              className={classNames(
                {
                  'has-background-info-light': isSeletedTodo,
                },
              )}
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
                <p className={classNames(
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
                  onClick={() => handleClick(todo)}
                >
                  <span className="icon">
                    <i className={classNames('far',
                      {
                        'fa-eye-slash': isSeletedTodo,
                        'fa-eye': !isSeletedTodo,
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
