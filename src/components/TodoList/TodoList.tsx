import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { PrepaparedTodo } from '../../types/PreparedTodo';

type Props = {
  todos: Todo[];
  setTodo: (todo: PrepaparedTodo | null) => void;
  todoModal: boolean;
  setTodoModal: (todoModal: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodo,
  todoModal,
  setTodoModal,
}) => {
  const handleTodoOpen = (todo: Todo) => {
    setTodoModal(true);
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
        {todos.map(todo => {
          const isSuccess = todo.completed;

          return (
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {isSuccess
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-danger': !isSuccess,
                  'has-text-success': isSuccess,
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
                  onClick={() => handleTodoOpen(todo)}
                >
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye': !todoModal,
                      'fa-eye-slash': todoModal,
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
