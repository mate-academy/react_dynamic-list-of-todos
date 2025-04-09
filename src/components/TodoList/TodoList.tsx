import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { useTodoContext } from '../../context/todoContext';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setSelectedTodo,
    activeEye,
    setActiveEye,
    statusFilter,
    searchQuery,
  } = useTodoContext();
  const filteredTodos = todos
    .filter(todo => {
      if (statusFilter === 'active') {
        return !todo.completed;
      }

      if (statusFilter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const toggleEye = (id: string) => {
    setActiveEye(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
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
        {filteredTodos.map(todo => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    toggleEye(todo.id.toString());
                    setSelectedTodo(todo);
                  }}
                >
                  {activeEye[todo.id] ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
