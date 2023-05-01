import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todos: Todo[] | null;
  setInicializationModal: (inicializationModal: boolean) => void;
  setTodoModal: (selectedTodo: Todo | undefined) => void;
  selectedTodo: Todo | undefined;
  setUser: (user: User) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setInicializationModal,
  setTodoModal,
  setUser,
  selectedTodo,
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

        {todos?.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={
              classNames(
                { 'has-background-info-light': selectedTodo?.id === todo.id },
              )
            }
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
              <p className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
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
                  setInicializationModal(true);
                  setTodoModal(todos.find(elem => elem.id === todo.id));
                  getUser(todo.userId)
                    .then(userInData => {
                      setUser(userInData);
                    });
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'far', {
                      'fa-eye': selectedTodo?.id !== todo.id,
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                    },
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
