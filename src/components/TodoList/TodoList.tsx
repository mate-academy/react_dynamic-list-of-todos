import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setIsModalIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  userTodo: Todo | null;
  isModalOpen: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIsModalIcon,
  setUserTodo,
  userTodo,
  isModalOpen,
}) => {
  function handleSetModalIcon(todo: Todo) {
    setIsModalIcon(true);
    setUserTodo(todo);
  }

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
          const { id, completed, title } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
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
                  onClick={() => handleSetModalIcon(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': todo !== userTodo || !isModalOpen,
                        'fa-eye-slash': todo === userTodo && isModalOpen,
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
