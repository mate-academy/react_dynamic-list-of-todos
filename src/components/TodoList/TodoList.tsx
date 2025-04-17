import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
type Props = {
  visibleTodos: Todo[];
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setModalIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsShown: boolean;
  todos: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setUserId,
  setTodo,
  setModalIsShown,
  modalIsShown,
  todos,
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
        <th></th>
      </tr>
    </thead>

    <tbody>
      {visibleTodos.map((todo: Todo) => {
        return (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-centered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
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
                onClick={() => {
                  setUserId(todo.userId);
                  setTodo(todo);
                  setModalIsShown(true);
                }}
              >
                <span className="icon">
                  {modalIsShown && todos?.id === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
