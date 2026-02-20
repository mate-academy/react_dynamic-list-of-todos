import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  toDos: Todo[];
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({ toDos, setSelectedTodo }) => (
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
      {toDos.map(toDo => {
        return (
          <tr key={toDo.id} data-cy="todo" className="">
            <td className="is-vcentered">{toDo.userId}</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({ 'has-text-danger': toDo.completed, 'has-text-success': !toDo.completed })}
              >
                {toDo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(toDo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
