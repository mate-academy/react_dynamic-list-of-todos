import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodo: (todo: Todo) => void,
  setIsModalSeen: (value: boolean) => void,
};

export const TodoList:
React.FC<Props> = ({
  todos,
  setTodo,
  setIsModalSeen,
}) => {
  const showModal = (todo: Todo) => {
    setIsModalSeen(true);
    setTodo(todo);
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
          {
            todos.map((todo:Todo) => {
              const { id, completed, title } = todo;
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
                      onClick={() => showModal(todo)}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};
