import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  filter: string;
};

export const TodoList: React.FC<Props> = ({ filter }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filterTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      {isLoading ? (
        <Loader loader={true} />
      ) : (
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
            {filterTodos.map(todo => (
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon has-text-success">
                      <i className="fas fa-check" />
                    </span>
                  ) : (
                    <span className="icon has-text-danger">
                      <i className="fas fa-times" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p>{todo.title}</p>
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
