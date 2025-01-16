/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos, getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { TodoModal } from '../TodoModal';

type Props = {
  filter: string;
  filterStatus: string;
};

type User = {
  name: string;
  id: number;
  email: string;
};

export const TodoList: React.FC<Props> = ({ filter, filterStatus }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTodo, setShowTodo] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleShowClick = async (todoId: number, userId: number) => {
    setShowTodo(todoId);
    setIsLoading(true);
    try {
      const user = await getUser(userId);

      setUserInfo(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'active' && !todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(filter.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [todos, filterStatus, filter]);

  return (
    <div>
      {isLoading && <Loader loader={true} />}
      {!isLoading && (
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
              <tr
                key={todo.id}
                data-cy="todo"
                style={{ color: todo.completed ? 'green' : 'red' }}
              >
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
                    onClick={() => handleShowClick(todo.id, todo.userId)}
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
      {showTodo && userInfo && (
        <TodoModal
          showTodo={showTodo}
          setShowTodo={setShowTodo}
          userInfo={userInfo}
          isLoading={isLoading}
          todo={todos.find(todo => todo.id === showTodo) || null}
        />
      )}
    </div>
  );
};
