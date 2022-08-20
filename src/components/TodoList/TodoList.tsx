import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  setIsActiveModal:(isActiveModal:boolean) => void;
  setTodo: (todo: Todo) => void;
  isActiveModal: boolean;
  filtredTodos: Todo[];

}

export const TodoList: React.FC<Props> = (props) => {
  const {
    setIsActiveModal,
    isActiveModal,
    setTodo,
    filtredTodos,
  } = props;

  const handelActivetedModal = (todo: Todo) => {
    setIsActiveModal(true);
    setTodo(todo);
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
        { filtredTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className="has-background-info-light"
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
              <p className={cn(
                { 'has-text-danger': !todo.completed },
                { 'has-text-success': todo.completed },
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
                onClick={() => handelActivetedModal(todo)}
              >
                <span className="icon">
                  <i className={cn(
                    'far',
                    { 'fa-eye-slash': isActiveModal },
                    { 'fa-eye': !isActiveModal },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
