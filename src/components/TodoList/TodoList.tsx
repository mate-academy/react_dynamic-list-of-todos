import cn from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodoModal: Dispatch<SetStateAction<Todo | null>>,
  setModalLoading: Dispatch<SetStateAction<boolean>>,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodoModal,
  setModalLoading,
}) => {
  const handleModal = (todo: Todo | null) => {
    setModalLoading(true);
    setTodoModal(todo);
    setTimeout(() => {
      setModalLoading(false);
    }, 1000);
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
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={cn({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleModal(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
