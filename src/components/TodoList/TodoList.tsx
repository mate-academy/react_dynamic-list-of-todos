import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  setIsLoading: (arg0: boolean) => void;
}

export const TodoList: React.FC<Props> = ({ setIsLoading }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .finally(() => setIsLoading(false));
  }, []);

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
        {todos?.map((todo: Todo) => {
          return (
            <>
              <tr data-cy="todo" className="">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  <span className="icon">
                    {todo.completed && <i className="fas fa-check" />}
                  </span>
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
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};
