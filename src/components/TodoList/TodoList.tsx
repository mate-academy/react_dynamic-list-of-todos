import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todo: Todo,
  isModalSeen: boolean,
  setTodo: (todo: Todo) => void,
  setIsModalSeen: (value: boolean) => void,
};

export const TodoList:
React.FC<Props> = ({
  todos,
  todo,
  isModalSeen,
  setTodo,
  setIsModalSeen,
}) => {
  const showModal = (item: Todo) => {
    setIsModalSeen(true);
    setTodo(item);
  };

  return (
    <>
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
          { todos.map((item:Todo) => {
            const { id, completed, title } = item;
            const btnClass = classNames({
              'has-text-success': completed,
              'has-text-danger': !completed,
            });

            return (
              <tr
                data-cy="todo"
                className=""
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
                  <p className={btnClass}>
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => showModal(item)}
                  >
                    <span className="icon">
                      <i className={
                        isModalSeen && item === todo
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
