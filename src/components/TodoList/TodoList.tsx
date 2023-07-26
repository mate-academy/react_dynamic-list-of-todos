import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  modalView: number,
  setModalView: React.Dispatch<React.SetStateAction<number>>,
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    modalView,
    setModalView,
  }) => {
    if (todos.length === 0) {
      return null;
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
          {todos.map(todo => (
            <tr
              data-cy="todo"
              className=""
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
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
                  onClick={() => setModalView(todo.id)}
                >
                  <span className="icon">
                    <i className={classNames({
                      'far fa-eye': modalView !== todo.id,
                      'far fa-eye-slash': modalView === todo.id,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);
