import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

type Props = {
  setIsLoading: (condition: boolean) => void;
  setSelectedTodoData: (data:
  { userId: number | null; todo: Todo | null }) => void;
  todos: Todo[] | null;
  setTodos: (todos: Todo[] | null) => void;
};

export const TodoList: React.FC<Props> = (
  {
    setIsLoading, setSelectedTodoData, todos, setTodos,
  },
) => {
  useEffect(() => {
    setIsLoading(true);
    const loadTodos = async () => {
      const fetchedTodos = await getTodos();

      setTodos(fetchedTodos);
    };

    loadTodos().finally(() => setIsLoading(false));
  }, [setIsLoading, setTodos]);

  const handleUserChange = (todo: Todo) => {
    setSelectedTodoData({ userId: todo.userId, todo });
  };

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
        {todos?.map(todo => {
          return (
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
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
                  onClick={() => handleUserChange(todo)}
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
};
