import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  modalTodo: Todo | undefined,
  setModalTodo: (todo: Todo) => void,
  setIsModalActive: (value: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  modalTodo,
  setModalTodo,
  setIsModalActive,
}) => {
  const modalActive = (todo: Todo) => {
    setModalTodo(todo);
    setIsModalActive(true);
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
      {todos.map(todo => (
        <tbody key={todo.id}>
          <tr data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => modalActive(todo)}
              >
                <span className="icon">
                  <i className={classNames('far ', {
                    'fa-eye-slash': modalTodo?.id === todo.id,
                    'fa-eye': modalTodo?.id !== todo.id,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      ))}

    </table>
  );
};
