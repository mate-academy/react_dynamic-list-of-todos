import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
// import { getTodos, getUser } from '../../api';
// import { Todo } from '../../types/Todo';
// import { User } from '../../types/User';

type Props = {
  allTodos: Todo[]
  onOpenModal: () => void
};

export const TodoList: React.FC<Props> = ({ allTodos, onOpenModal }) => {
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
        {allTodos.map(todos => (
          <>
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{todos.id}</td>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  { 'has-text-danger': todos.completed === false },
                  { 'has-text-success': todos.completed === true },
                )}
                >
                  {todos.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onOpenModal()}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          </>
        ))}
        {/* <tr data-cy="todo" className="has-background-info-light">
          <td className="is-vcentered">2</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">quis ut nam facilis et officia qui</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye-slash" />
              </span>
            </button>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};
