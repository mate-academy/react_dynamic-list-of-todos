import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import classNames from 'classnames';
type Props = {
  setModalWindow: (value: boolean) => void;
  todos: Todo[];
  loading: boolean;
  getCurrentTodo: (value: Todo) => void;
  getCurrentUser: (value: number) => void;
  currentTodo: Todo | null;
  modalWindow: boolean;
};
export const TodoList: React.FC<Props> = ({
  setModalWindow,
  getCurrentTodo,
  getCurrentUser,
  todos,
  loading,
  currentTodo,
  modalWindow,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon"></span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loader />
        ) : (
          todos.map((todo: Todo) => {
            return (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
                key={todo.id}
                onClick={() => {
                  getCurrentTodo(todo);
                  getCurrentUser(todo.userId);
                }}
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
                    onClick={event => {
                      event.stopPropagation();
                      setModalWindow(true);
                    }}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': !modalWindow,
                          'fa-eye-slash': modalWindow,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
